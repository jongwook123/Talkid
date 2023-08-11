package com.talkids.backend.member.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.common.token.JwtToken;
import com.talkids.backend.common.token.JwtTokenProvider;

import com.talkids.backend.language.entity.Language;
import com.talkids.backend.language.repository.LanguageRepository;
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

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberTypeRepository memberTypeRepository;
    private final CountryRepository countryRepository;
    private final LanguageRepository languageRepository;
    private final SchoolRepository schoolRepository;
    private final BookMarkRepository bookMarkRepository;
    private final FollowerRepository followerRepository;
    private final ExpRepository expRepository;

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

        // refreshToken DB에 저장
        Member member = memberRepository.findByMemberMail(req.getMemberMail())
                .orElseThrow(()->new IllegalArgumentException("다시 시도해 주세요"));

        member.setRefreshToken(jwtToken.getRefreshToken());

        Map<String, String> ret = new HashMap<>();
        ret.put("accessToken", jwtToken.getAccessToken());
        ret.put("refreshToken", jwtToken.getRefreshToken());

        return ret;
    }

    /** 회원 정보 수정 */
    @Transactional
    @Override
    public String updateInfoDto(Member member, UpdateInfoDto.Request req) {

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
    public String deleteInfoDto(Member member) throws NotFoundException {

        member.setDeletedAt(true);

        return "Success";
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

    /* ------------------------------------------------------*/

    /** 사용자 찾기 및 필터링 */
    @Override
    public List<?> findMember(String searchBy, String keyword) throws NotFoundException {
        List<?> ret = new ArrayList<>();

        // 내 정보 제외하고 출력하기 - 미완성

        if(searchBy.equals("all")){
            // 회원 이메일로 검색
            if(keyword!=""){
                if(memberRepository.findByMemberMail(keyword).isEmpty())
                    throw new NotFoundException("회원 정보가 없습니다.");

                ret = Collections.singletonList(
                        memberRepository.findByMemberMail(keyword));
            }
            // 모든 사용자 찾기
            else{
                ret = memberRepository.findAll();
            }
        } else if(searchBy.equals("school")){
            if(schoolRepository.findBySchoolId(Integer.parseInt(keyword)).isEmpty())
                throw new NotFoundException("학교 정보가 없습니다.");
            ret = memberRepository.findBySchool_SchoolId(Integer.parseInt(keyword));
        } else if(searchBy.equals("language")){
            if(languageRepository.findByLanguageId(Integer.parseInt(keyword)).isEmpty())
                throw new NotFoundException("언어 정보가 없습니다.");
            ret = memberRepository.findByLanguage_LanguageId(Integer.parseInt(keyword));
        } else if(searchBy.equals("country")){
            if(countryRepository.findByCountryId(Integer.parseInt(keyword)).isEmpty())
                throw new NotFoundException("국가 정보가 없습니다.");
            ret = memberRepository.findByCountry_CountryId(Integer.parseInt(keyword));
        } else {
            throw new NotFoundException("정보를 정확하게 입력해 주세요.");
        }

        return ret;
    }

    /* ------------------------------------------------------*/

    /** 북마크 조회 */
    @Override
    public List<BookMark> getBookMark(Member member) throws NotFoundException {
        return bookMarkRepository.findByMember_MemberId(member.getMemberId());
    }

    /** 북마크 등록 */
    @Transactional
    @Override
    public AddBookMarkDto.Response addBookMark(Member member, AddBookMarkDto.Request req) throws NotFoundException {
        BookMark bookMark = bookMarkRepository.save(
                req.saveBookMarkDto(member)
        );

        return AddBookMarkDto.Response.BookMarkResponseDto(
                req.getBookMarkOriContent(),
                req.getBookMarkTransContent(),
                bookMark.getCreatedAt()
        );
    }

    /** 북마크 삭제 */
    @Transactional
    @Override
    public String deleteBookMark(Member member, int bookMarkId) throws NotFoundException {
        bookMarkRepository.findByBookMarkId(bookMarkId)
                        .orElseThrow(()-> new NotFoundException("등록된 북마크가 없습니다."));

        bookMarkRepository.deleteByBookMarkIdAndMember_MemberId(bookMarkId, member.getMemberId());

        return "Success";
    }

    /* ------------------------------------------------------*/

    /** 팔로우, 언팔로우 */
    @Transactional
    @Override
    public FollowerDto.Response addFollower(Member member, int memberId) throws NotFoundException {
        Member newMember = memberRepository.findByMemberId(memberId)
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));

        if(member.getMemberId() == memberId)
            throw new NotFoundException("본인에게 팔로우 신청을 할 수 없습니다");

        Optional<Follower> follower = followerRepository.findByMemberAndFollowerMember(member, newMember);

        if(follower.isEmpty()){
            followerRepository.save(
                Follower.builder()
                        .member(member)
                        .followerMember(newMember)
                        .build()
            );

        } else {
            followerRepository.delete(follower.get());
        }

        Map<String, ?> countMember = cntFollower(member.getMemberId(), "cnt");

        return FollowerDto.Response.FollowerResponseDto(
                member.getMemberMail(),
                countMember,
                newMember.getMemberMail(),
                LocalDateTime.now()
        );
    }

    @Override
    public Map<String, ?> cntFollower(int memberId, String info) throws NotFoundException {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));
        if(!info.equals("list") && !info.equals("cnt"))
            throw new NotFoundException("정보를 정확하게 입력해 주세요.");

        List<FollowerDto.InfoResponse> followingList = followerRepository.findByMember(member).stream()
                .map(follower -> FollowerDto.InfoResponse.InfoResponseDto(
                        follower.getFollowerMember().getMemberId(),
                        follower.getFollowerMember().getMemberMail(),
                        follower.getFollowerMember().getMemberName()
                ))
                .collect(Collectors.toList());

        List<FollowerDto.InfoResponse> followersList = followerRepository.findByFollowerMember(member).stream()
                .map(follower -> FollowerDto.InfoResponse.InfoResponseDto(
                        follower.getMember().getMemberId(),
                        follower.getMember().getMemberMail(),
                        follower.getMember().getMemberName()
                ))
                .collect(Collectors.toList());

        if(info.equals("cnt")){
            Map<String, Integer> ret = new HashMap<>();

            ret.put("Following", followingList.size());
            ret.put("Follower", followersList.size());

            return ret;
        } else{
            Map<String, List<FollowerDto.InfoResponse>> ret = new HashMap<>();

            ret.put("Following", followingList);
            ret.put("Follower", followersList);

            return ret;
        }
    }

    @Override
    public int getExp(int memberId) throws NotFoundException {
        memberRepository.findByMemberId(memberId)
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));

        int totalExp = 0;
        List<Exp> expList = expRepository.findByMember_MemberId(memberId);
        for(Exp e : expList){
            totalExp+=e.getExpPoint();
        }

        return totalExp;
    }

}
