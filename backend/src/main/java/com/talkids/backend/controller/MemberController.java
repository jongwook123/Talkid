package com.talkids.backend.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dto.SignInDto;
import com.talkids.backend.dto.SignUpDto;
import com.talkids.backend.dto.UpdateInfoDto;
import com.talkids.backend.entity.Member;
import com.talkids.backend.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/signUp")
    public ApiResult<String> SignUp(@Valid @RequestBody SignUpDto.Request req) throws Exception {
        return success(memberService.SignUp(req));
    }

    @PostMapping("/signIn")
    public ApiResult<String> signIn(@Valid @RequestBody SignInDto.Request req) throws Exception {
        return success(memberService.signIn(req));
    }

    @PutMapping("/{memberId}")
    public ApiResult<String> updateInfo(@PathVariable int memberId, @Valid @RequestBody UpdateInfoDto.Request req) throws Exception {
        return success(memberService.UpdateInfoDto(memberId, req));
    }

}
