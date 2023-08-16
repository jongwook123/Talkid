package com.talkids.backend.notify.controller;

import com.talkids.backend.common.annotation.LoginUser;
import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.common.utils.TimeUtils;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.service.GroupService;
import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.meeting.service.MeetingService;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.entity.TimeZone;
import com.talkids.backend.notify.dto.CreateNotifyDto;
import com.talkids.backend.notify.entity.NotifyType;
import com.talkids.backend.notify.service.NotifyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/notify")
@AllArgsConstructor
@EnableScheduling
public class NotifyController {
  
  private final NotifyService notifyService;
  private final MeetingService meetingService;
  private final GroupService groupService;

  private final TimeUtils timeUtils;
  
  //내 알람들 보기
  @GetMapping
  public ApiResult getMyNotifys(@LoginUser Member member){
    if(member == null) ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
    
    return ApiUtils.success(notifyService.getNotifyByMember(member));
  }
  
  //알림 읽은 처리
  @PatchMapping("/{notifyContentId}")
  public ApiResult checkNotify(@LoginUser Member member, @PathVariable("notifyContentId") Integer notifyContentId){
    if(member == null) ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
    
    try {
      notifyService.checkNotify(member, notifyContentId);
      return ApiUtils.success("성공");
    } catch(Exception e){
      return ApiUtils.error(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  //10분 마다 10분 이내에 시작되는 미팅에 대해 알림 처리
  @Scheduled(fixedDelay = (1000 * 60 * 10))
  public void startMeetings(){
    Long minute = 10L;
    notifyService.notifyStartMeetings(minute);
  }
}
