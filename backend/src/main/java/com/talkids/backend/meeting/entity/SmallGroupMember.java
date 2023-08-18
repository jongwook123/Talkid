package com.talkids.backend.meeting.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="SmallGroupMember")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class SmallGroupMember {

    @Id
    @Column(name="smallGroupMemberId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int smallGroupMemberId;

    /* ---------------------------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="smallGroupId")
    @JsonBackReference
    private SmallGroup smallGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="memberId")
    private Member member;

}
