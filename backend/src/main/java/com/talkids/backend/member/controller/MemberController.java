package com.talkids.backend.member.controller;

import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.dto.*;
import com.talkids.backend.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static com.talkids.backend.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    /** 로그인 조회 */
    @GetMapping
    @ResponseBody
    public ApiResult<Member> getUser(Principal principal)  {
        return success(memberService.getMember(principal.getName()));
    }

    /** 국가, 언어, 학교 조회 */
    @GetMapping("/{info}")
    public ApiResult<List<?>> getSignUpInfo(@PathVariable String info) throws Exception {
        return success(memberService.getSignUpInfo(info));
    }

    /** 회원가입 */
    @PostMapping("/signup")
    public ApiResult<String> signUp(@Valid @RequestBody SignUpDto.Request req) throws Exception {
        return success(memberService.signUp(req));
    }

    /** 로그인 */
    @PostMapping("/signin")
    public ApiResult<String> signIn(@Valid @RequestBody SignInDto.Request req) throws Exception {
        return success(memberService.signIn(req));
    }

    /** 회원 정보 수정 */
    @PutMapping("/{memberId}")
    public ApiResult<String> updateInfo(@PathVariable int memberId, @Valid @RequestBody UpdateInfoDto.Request req, Principal principal) throws Exception {
        return success(memberService.updateInfoDto(memberId, req, principal));
    }

    /** 로그아웃 */
    @PostMapping("/logout")
    public ApiResult<String> logout(@Valid @RequestBody LogoutDto.Request req) throws Exception {
        return success(memberService.logout(req));
    }

    /** 회원 탈퇴 */
    @DeleteMapping("/{memberId}")
    public ApiResult<String> deleteInfo(@PathVariable int memberId, Principal principal) throws Exception {
        return success(memberService.deleteInfoDto(memberId, principal));
    }

    /** 비밀번호 찾기 - 임시 비밀번호 발급 */
    @PostMapping("/findpw")
    public ApiResult<String> findPw(@Valid @RequestBody FindPwDto.Request req) throws Exception {
        return success(memberService.findPw(req));
    }

    /** 사용자 찾기 및 필터링 */
    @GetMapping("/findmember")
    public ApiResult<?> findMember(@Valid @RequestBody FindMemberDto.Request req) {
        try{
            List<?> result = memberService.findMember(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
