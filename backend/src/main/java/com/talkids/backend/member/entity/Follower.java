package com.talkids.backend.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="Follower")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="followerId")
    private int followerId;

    @Column(name="createdAt")
    @CreatedDate
    private LocalDateTime createAt;

    /* ---------------------------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="memberId")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="followerMember")
    private Member followerMember;

}
