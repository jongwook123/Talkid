package com.talkids.backend.notify.dto;

import com.talkids.backend.notify.entity.NotifyType;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class CreateNotifyDto {
  
  @Builder
  @Getter
  public static class Request{
    private String notifyHeader;
    private String notifyBody;
    private NotifyType notifyType;
    
    public Map<String, Object> toMap(){
      Map<String, Object> map = new HashMap<>();
      map.put("notifyHeader", notifyHeader);
      map.put("notifyBody", notifyBody);
      map.put("notifyType", notifyType);
      return map;
    }
  }
}
