package com.talkids.backend.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.common.token.JwtToken;
import com.talkids.backend.common.token.JwtTokenProvider;
import com.talkids.backend.dto.LogoutDto;
import com.talkids.backend.dto.SignInDto;

import com.talkids.backend.dto.SignUpDto;
import com.talkids.backend.dto.UpdateInfoDto;
import com.talkids.backend.entity.*;
import com.talkids.backend.repository.*;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberTypeRepository memberTypeRepository;
    private final CountryRepository countryRepository;
    private final LanguageRepository languageRepository;
    private final SchoolRepository schoolRepository;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate redisTemplate;

    @Override
    public Member getMember(String memberMail) {
        return memberRepository.findByMemberMail(memberMail).get();
    }

    @Transactional
    @Override
    public String signUp(SignUpDto.Request req) {
        if (memberRepository.findByMemberMail(req.getMemberMail()).isPresent()){
            throw new IllegalArgumentException("다시 시도해 주세요");
        }

        Country country = countryRepository.findByCountryId(req.getCountryId());
        School school = schoolRepository.findBySchoolId(req.getSchoolId());
        Language language = languageRepository.findByLanguageId(req.getLanguageId());
        MemberType memberType = memberTypeRepository.findByMemberTypeId(req.getMemberTypeId());

        String encodePassword = passwordEncoder.encode(req.getMemberPassword()); // 비밀번호 암호화

        Member member = memberRepository.save(req.saveMemberDto(encodePassword, school, language, country, memberType));

        return member.getMemberMail();
    }

    @Transactional
    @Override
    public String signIn(SignInDto.Request req) {

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(req.getMemberMail(), req.getMemberPassword());

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);
        String accessToken = jwtToken.getAccessToken();

        // refreshToken DB에 저장
        Member member = memberRepository.findByMemberMail(req.getMemberMail())
                .orElseThrow(()->new IllegalArgumentException("다시 시도해 주세요"));

        member.setRefreshToken(jwtToken.getRefreshToken());

        System.out.println("jwtToken:" + jwtToken);
        return accessToken;
    }

    @Transactional
    @Override
    public String updateInfoDto(int memberId, UpdateInfoDto.Request req, Principal principal) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(()->new IllegalArgumentException("다시 시도해 주세요"));

//        member = getMember(principal.getName());

        member.setMemberPassword(passwordEncoder.encode(req.getMemberPassword()));
        member.setCountry(countryRepository.findByCountryId(req.getCountryId()));
        member.setLanguage(languageRepository.findByLanguageId(req.getLanguageId()));
        member.setMemberIntroduce(req.getMemberIntroduce());

        return member.getMemberMail();
    }

    @Transactional
    @Override
    public String logout(LogoutDto.Request req) {
        // 1. Access Token 검증
        if (!jwtTokenProvider.validateToken(req.getAccessToken())) {
            throw new NotFoundException("잘못된 접근입니다.");
        }

        // 2. Access Token 에서 User email 을 가져옵니다.
        Authentication authentication = jwtTokenProvider.getAuthentication(req.getAccessToken());

        // 3. Redis 에서 해당 User email 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            // Refresh Token 삭제
            redisTemplate.delete("RT:" + authentication.getName());
        }

        // Refresh Token DB에서 삭제
        memberRepository.findByMemberMail(authentication.getName()).get().setRefreshToken(null);

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(req.getAccessToken());
        redisTemplate.opsForValue()
                .set(req.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);

        return authentication.getName();
    }
}
