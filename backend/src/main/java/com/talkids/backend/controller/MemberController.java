package com.talkids.backend.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dto.MemberSignUpDto;
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

//    @PostMapping("/signUp")
//    public String teacherSignUp(@RequestBody SignUpDTO signUpDTO) throws Exception {
//        System.out.println(signUpDTO);
////        return success(memberService.teacherSignUp(signUpDTO));
//        return "OK";
//    }

    @PostMapping("/signUp")
    public ApiResult<String> teacherSignUp(@Valid @RequestBody MemberSignUpDto.Request req) throws Exception {

        System.out.println(req);
        return success(memberService.teacherSignUp(req));
    }

    @GetMapping
    public String test() {
        return "oK";
    }


}
