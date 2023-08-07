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
    public ApiResult<?> getUser(Principal principal) {
        try{
            Member result = memberService.getMember(principal.getName());
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 국가, 언어, 학교 조회 */
    @GetMapping("/{info}")
    public ApiResult<?> getSignUpInfo(@PathVariable String info) {
        try{
            List<?> result = memberService.getSignUpInfo(info);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 회원가입 */
    @PostMapping("/signup")
    public ApiResult<?> signUp(@Valid @RequestBody SignUpDto.Request req) {
        try{
            Member result = memberService.signUp(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 로그인 */
    @PostMapping("/signin")
    public ApiResult<?> signIn(@Valid @RequestBody SignInDto.Request req) {
        try{
            String result = memberService.signIn(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 회원 정보 수정 */
    @PutMapping("/{memberId}")
    public ApiResult<?> updateInfo(@PathVariable int memberId, @Valid @RequestBody UpdateInfoDto.Request req, Principal principal) {
        try{
            String result = memberService.updateInfoDto(memberId, req, principal);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 로그아웃 */
    @PostMapping("/logout")
    public ApiResult<?> logout(@Valid @RequestBody LogoutDto.Request req) {
        try{
            String result = memberService.logout(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 회원 탈퇴 */
    @DeleteMapping("/{memberId}")
    public ApiResult<?> deleteInfo(@PathVariable int memberId, Principal principal) {
        try{
            String result = memberService.deleteInfoDto(memberId, principal);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 비밀번호 찾기 - 임시 비밀번호 발급 */
    @PostMapping("/findpw")
    public ApiResult<?> findPw(@Valid @RequestBody FindPwDto.Request req) {
        try{
            String result = memberService.findPw(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
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
