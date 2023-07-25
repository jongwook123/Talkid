package com.talkids.backend.service;

import com.talkids.backend.common.token.JwtToken;
import com.talkids.backend.common.token.JwtTokenProvider;
import com.talkids.backend.dto.SignInDto;
import com.talkids.backend.dto.SignUpDto;
import com.talkids.backend.entity.*;
import com.talkids.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    @Override
    public String SignUp(SignUpDto.Request req) {
        if (memberRepository.findByMemberMail(req.getMemberMail()).isPresent()){
            return null;
        }

        Country country = countryRepository.findByCountryName(req.getCountryName());
        School school = schoolRepository.findBySchoolName(req.getSchoolName());
        Language language = languageRepository.findByLanguageEng(req.getLanguageEng());
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
}
