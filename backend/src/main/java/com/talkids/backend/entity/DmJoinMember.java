package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="DmJoinMember")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DmJoinMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="dmJoinMemberId")
    private int dmJoinMemberId;

    /* ---------------------------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dmRoomId")
    private DmRoom dmRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="memberId")
    private Member member;

}
