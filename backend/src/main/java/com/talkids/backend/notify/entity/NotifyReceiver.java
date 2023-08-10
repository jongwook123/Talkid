package com.talkids.backend.notify.entity;

import com.talkids.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="NotifyReceiver")
@Builder
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class NotifyReceiver {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="notifyReceiverId")
  private Integer notifyReceiverId;
  
  @Column(name="notifyReceiverChecked", nullable = false)
  private Boolean notifyReceiverChecked;                //사용자가 읽었는지 안 읽었는지
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="memberId")
  private Member member;  //알림의 수신자
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="notifyContentId")
  private NotifyContent notifyContent;  //어떤 알림인지
  
  /* ---------------------------------- */
  
  @Column(name="createdAt", updatable = false)
  @CreatedDate
  private LocalDateTime createdAt;
  
  /* ---------------------------------- */
  
}
