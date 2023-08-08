package com.talkids.backend.member.controller;

import com.talkids.backend.common.annotation.LoginUser;
import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.member.entity.BookMark;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.dto.*;
import com.talkids.backend.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import static com.talkids.backend.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    /** 로그인 조회 */
    @GetMapping
    public ApiResult<?> getUser(@LoginUser Member member) {
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);

        try{
            return ApiUtils.success(member);
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
            Map<String, String> result = memberService.signIn(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 회원 정보 수정 */
    @PutMapping("/edit")
    public ApiResult<?> updateInfo(@LoginUser Member member, @Valid @RequestBody UpdateInfoDto.Request req) {
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);

        try{
            String result = memberService.updateInfoDto(member, req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 로그아웃 */
    @PostMapping("/logout")
    public ApiResult<?> logout(@LoginUser Member member, @Valid @RequestBody LogoutDto.Request req) {
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);

        try{
            String result = memberService.logout(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 회원 탈퇴 */
    @DeleteMapping
    public ApiResult<?> deleteInfo(@LoginUser Member member) {
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);

        try{
            String result = memberService.deleteInfoDto(member);
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
    public ApiResult<?> findMember(@RequestParam("searchBy") String searchBy, @RequestParam("keyword") String keyword) {
        try{
            List<?> result = memberService.findMember(searchBy, keyword);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 북마크 조회 */
//    @GetMapping("/bookmark/{memberId}")
//    public ApiResult<?> getBookMark(@PathVariable int memberId) {
//        try{
//            List<BookMark> result = memberService.getBookMark(memberId);
//            return ApiUtils.success(result);
//        } catch(Exception e){
//            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
//        }
//    }


    /** 북마크에 저장 */


    /** 북마크 삭제 */


}
