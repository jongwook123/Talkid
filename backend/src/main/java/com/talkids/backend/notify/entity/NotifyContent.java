package com.talkids.backend.notify.entity;

import com.talkids.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="NotifyContent")
@Builder
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class NotifyContent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="notifyContentId")
  private Integer notifyContentId;
  
  @Column(name="notifyHeader", nullable = false, length=45)
  private String notifyHeader;
  
  @Column(name="notifyBody", nullable = false, length=100)
  private String notifyBody;
  
  /* ---------------------------------- */
  
  @Column(name="createdAt", updatable = false)
  @CreatedDate
  private LocalDateTime createdAt;
  
  /* ---------------------------------- */
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="memberId")
  private Member member;  //알림의 발행자
  
}
