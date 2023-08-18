package com.talkids.backend.meeting.dto;

import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.meeting.entity.MeetingJoinReq;
import lombok.Builder;
import lombok.Getter;

@Builder @Getter
public class MeetingJoinReqDto {
  private int meetingJoinReqId;
  private GroupDto group;
  
  public static MeetingJoinReqDto fromEntity(MeetingJoinReq req){
    return MeetingJoinReqDto.builder()
        .meetingJoinReqId(req.getMeetingJoinReqId())
        .group(GroupDto.fromEntity(req.getGroup()))
        .build();
  }
}
