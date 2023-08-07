package com.talkids.backend.member.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.common.token.JwtToken;
import com.talkids.backend.common.token.JwtTokenProvider;

import com.talkids.backend.member.dto.*;
import com.talkids.backend.member.entity.*;
import com.talkids.backend.member.repository.*;
import com.talkids.backend.common.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.*;
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
    private final MailService mailService;

    @Override
    public Member getMember(String memberMail) throws NotFoundException {
        Member member = memberRepository.findByMemberMail(memberMail)
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));

        return member;
    }

    /** 회원가입 */
    @Transactional
    @Override
    public Member signUp(SignUpDto.Request req) throws NotFoundException {
        if (memberRepository.findByMemberMail(req.getMemberMail()).isPresent()){
            throw new NotFoundException("중복된 E-mail 입니다.");
        }

        Country country = countryRepository.findByCountryId(req.getCountryId())
                .orElseThrow(() -> new NotFoundException("국가 정보가 없습니다."));
        School school = schoolRepository.findBySchoolId(req.getSchoolId())
                .orElseThrow(() -> new NotFoundException("학교 정보가 없습니다."));
        Language language = languageRepository.findByLanguageId(req.getLanguageId())
                .orElseThrow(() -> new NotFoundException("언어 정보가 없습니다."));
        MemberType memberType = memberTypeRepository.findByMemberTypeId(req.getMemberTypeId())
                .orElseThrow(() -> new NotFoundException("회원 타입 정보가 없습니다."));

        String encodePassword = passwordEncoder.encode(req.getMemberPassword()); // 비밀번호 암호화

        Member member = memberRepository.save(req.saveMemberDto(encodePassword, school, language, country, memberType));

        return member;
    }

    /** 회원가입 - 국가, 학교, 언어 리스트 */
    public List<?> getSignUpInfo(String info){
        List<?> ret = new ArrayList<>();

        if(info.equals("school")){
            ret = schoolRepository.findAll();
        } else if(info.equals("language")){
            ret = languageRepository.findAll();
        } else if(info.equals("country")){
            ret = countryRepository.findAll();
        } else {
            throw new NotFoundException("정보를 정확하게 입력해 주세요.");
        }

        return ret;
    }

    /** 로그인 */
    @Transactional
    @Override
    public Map<String, String> signIn(SignInDto.Request req) {

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

        Map<String, String> ret = new HashMap<>();
        ret.put("accessToken", jwtToken.getAccessToken());
        ret.put("refreshToken", jwtToken.getRefreshToken());

        return ret;
    }

    /** 회원 정보 수정 */
    @Transactional
    @Override
    public String updateInfoDto(int memberId, UpdateInfoDto.Request req, Principal principal) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));

        member.setMemberPassword(passwordEncoder.encode(req.getMemberPassword()));
        member.setCountry(countryRepository.findByCountryId(req.getCountryId()).get());
        member.setLanguage(languageRepository.findByLanguageId(req.getLanguageId()).get());
        member.setMemberIntroduce(req.getMemberIntroduce());

        return member.getMemberMail();
    }

    /** 로그아웃 */
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

    /** 회원 탈퇴 */
    @Transactional
    @Override
    public String deleteInfoDto(int memberId, Principal principal) throws NotFoundException {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));

        // 로그인 확인
        if(member.getRefreshToken()!=null){
            member.setDeletedAt(true);
        } else throw new NotFoundException("잘못된 접근입니다.");

        return member.getMemberMail();
    }

    /** 비밀번호 찾기 - 임시 비밀번호 발급 */
    @Transactional
    @Override
    public String findPw(FindPwDto.Request req) throws Exception {
        Member member = memberRepository.findByMemberMail(req.getMemberMail())
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));

        // 임시 비밀번호를 생성하여 저장
        String tmpPassword = getTmpPassword();
        member.setMemberPassword(passwordEncoder.encode(tmpPassword)); // 암호화

        mailService.sendEmailMessage(tmpPassword, req.getMemberMail());

        return member.getMemberMail();
    }

    /** 임시 비밀번호 생성 **/
    @Override
    public String getTmpPassword() throws NotFoundException {
        StringBuilder pwd = new StringBuilder();

        char[] charSet = new char[]{ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        /* 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 조합 */
        int idx = 0;
        for(int i = 0; i < 10; i++){
            idx = (int)(charSet.length * Math.random());
            pwd.append(charSet[idx]);
        }

        return pwd.toString();
    }

    /** 사용자 찾기 및 필터링 */
    @Override
    public List<?> findMember(FindMemberDto.Request req) throws NotFoundException {
        List<?> ret = new ArrayList<>();

        String info = req.getInfo();
        int infoId = req.getInfoId();

        // 내 정보 제외하고 출력하기 - 미완성

        if(info.equals("all")){
            // 회원 이메일로 검색
            if(req.getMemberMail()!=null){
                if(memberRepository.findByMemberMail(req.getMemberMail()).isEmpty())
                    throw new NotFoundException("회원 정보가 없습니다.");

                ret = Collections.singletonList(
                        memberRepository.findByMemberMail(req.getMemberMail()));
            }
            // 모든 사용자 찾기
            else{
                ret = memberRepository.findAll();
            }
        } else if(info.equals("school")){
            if(schoolRepository.findBySchoolId(infoId).isEmpty())
                throw new NotFoundException("학교 정보가 없습니다.");
            ret = memberRepository.findBySchool_SchoolId(infoId);
        } else if(info.equals("language")){
            if(languageRepository.findByLanguageId(infoId).isEmpty())
                throw new NotFoundException("언어 정보가 없습니다.");
            ret = memberRepository.findByLanguage_LanguageId(infoId);
        } else if(info.equals("country")){
            if(countryRepository.findByCountryId(infoId).isEmpty())
                throw new NotFoundException("국가 정보가 없습니다.");
            ret = memberRepository.findByCountry_CountryId(infoId);
        } else {
            throw new NotFoundException("정보를 정확하게 입력해 주세요.");
        }

        return ret;
    }

}
