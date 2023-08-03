package com.talkids.backend.meeting.controller;

import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.meeting.service.MeetingService;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/meeting")
public class MeetingController {

    private final MemberService memberService;
    private final MeetingService meetingServiec;

    @GetMapping("/empty")
    @ResponseBody
    public ApiResult test(Principal principal){
        if(principal == null){
            //Authorization 헤더가 제대로 오지 않은 경우다
            return ApiUtils.error("로그인 정보가 일치하지 않습니다", HttpStatus.UNAUTHORIZED);
        }
        Member member = memberService.getMember(principal.getName());
        List<MeetingSchedule> schedules = meetingServiec.getMeetingScheduleByMember(member);
        return ApiUtils.success(schedules);
    }
}
