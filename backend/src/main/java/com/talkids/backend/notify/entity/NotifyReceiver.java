package com.talkids.backend.notify.entity;

import com.talkids.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="NotifyReceiver")
@Builder
@Getter
@Setter
@AllArgsConstructor
public class NotifyReceiver {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="notifyReceiverId")
  private Integer notifyReceiverId;
  
  @Column(name="notifyReceiverStatus", nullable = false)
  private Boolean notifyReceiverStatus;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="memberId")
  private Member member;  //알림의 수신자
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="notifyContentId")
  private NotifyContent notifyContent;  //어떤 알림인지
  
}
