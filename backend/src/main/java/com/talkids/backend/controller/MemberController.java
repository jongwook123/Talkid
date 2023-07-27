package com.talkids.backend.controller;

import com.talkids.backend.common.filter.JwtAuthenticationFilter;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dto.*;
import com.talkids.backend.entity.Member;
import com.talkids.backend.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import static com.talkids.backend.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    @ResponseBody
    public ApiResult<Member> getUser(Principal principal)  {
        return success(memberService.getMember(principal.getName()));
    }

    @PostMapping("/signup")
    public ApiResult<String> signUp(@Valid @RequestBody SignUpDto.Request req) throws Exception {
        return success(memberService.signUp(req));
    }

    @PostMapping("/signin")
    public ApiResult<String> signIn(@Valid @RequestBody SignInDto.Request req) throws Exception {
        return success(memberService.signIn(req));
    }

    @PutMapping("/{memberId}")
    public ApiResult<String> updateInfo(@PathVariable int memberId, @Valid @RequestBody UpdateInfoDto.Request req, Principal principal) throws Exception {
        return success(memberService.updateInfoDto(memberId, req, principal));
    }

    @PostMapping("/logout")
    public ApiResult<String> logout(@Valid @RequestBody LogoutDto.Request req) throws Exception {
        return success(memberService.logout(req));
    }

    @DeleteMapping("/{memberId}")
    public ApiResult<String> deleteInfo(@PathVariable int memberId, Principal principal) throws Exception {
        return success(memberService.deleteInfoDto(memberId, principal));
    }

    @PostMapping("/findpw")
    public ApiResult<String> findPw(@Valid @RequestBody FindPwDto.Request req) throws Exception {
        return success(memberService.findPw(req));
    }

}
