package com.talkids.backend.notify.dto;

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
    
    public Map<String, Object> toMap(){
      Map<String, Object> map = new HashMap<>();
      map.put("notifyHeader", notifyHeader);
      map.put("notifyBody", notifyBody);
      return map;
    }
  }
}
