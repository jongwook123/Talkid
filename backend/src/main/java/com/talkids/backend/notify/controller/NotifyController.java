package com.talkids.backend.notify.controller;

import com.talkids.backend.common.annotation.LoginUser;
import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.notify.service.NotifyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notify")
@AllArgsConstructor
public class NotifyController {
  
  private final NotifyService notifyService;
  
  @GetMapping
  public ApiResult getMyNotifys(@LoginUser Member member){
    if(member == null) ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
    
    return ApiUtils.success(notifyService.getNotifyByMember(member));
  }
  
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


}
