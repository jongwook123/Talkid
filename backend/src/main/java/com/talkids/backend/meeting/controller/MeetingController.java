package com.talkids.backend.meeting.controller;

import com.talkids.backend.common.annotation.LoginUser;
import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.meeting.service.MeetingService;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/meeting")
public class MeetingController {

    private final MemberService memberService;
    private final MeetingService meetingServiec;

    @GetMapping("")
    public ApiResult test(@LoginUser Member member) throws Exception{
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
        return ApiUtils.success("test!!!");
    }
}
