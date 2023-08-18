package com.talkids.backend.notify.dto;

import com.talkids.backend.member.dto.MemberDto;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.notify.entity.NotifyContent;
import com.talkids.backend.notify.entity.NotifyReceiver;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class NotifyDto {
  private Integer notifyContentId;
  private String notifyHeader;
  private String notifyBody;
  private MemberDto sender;
  
  private Integer notifyReceiverId;
  private Boolean checked;
  private MemberDto receiver;
  
  private LocalDateTime createdAt;
  
  public static NotifyDto fromEntity(NotifyContent content, NotifyReceiver receiver){
    return NotifyDto.builder()
        .notifyContentId(content.getNotifyContentId())
        .notifyHeader(content.getNotifyHeader())
        .notifyBody(content.getNotifyBody())
        .sender(MemberDto.fromEntity(content.getMember()))
        .createdAt(content.getCreatedAt())
        
        .notifyReceiverId(receiver.getNotifyReceiverId())
        .checked(receiver.getNotifyReceiverChecked())
        .receiver(MemberDto.fromEntity(receiver.getMember()))
        .build();
  }
}
