package com.talkids.backend.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dto.SignInDto;
import com.talkids.backend.dto.TeacherSignUpDto;
import com.talkids.backend.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.talkids.backend.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signUp")
    public ApiResult<String> teacherSignUp(@Valid @RequestBody TeacherSignUpDto.Request req) throws Exception {
        System.out.println(req);
        return success(memberService.teacherSignUp(req));
    }

    @PostMapping("/signIn")
    public ApiResult<String> signIn(@Valid @RequestBody SignInDto.Request req) throws Exception {

        System.out.println(req);
        return success(memberService.signIn(req));
    }

}
