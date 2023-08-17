package com.talkids.backend.meeting.entity;

import com.talkids.backend.group.entity.Group;
import com.talkids.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="MeetingJoinReq")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class MeetingJoinReq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="meetingJoinReqId")
    private int meetingJoinReqId;

    /* ---------------------------------- */

    @ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "meetingScheduleId")
    private MeetingSchedule meetingSchedule;


    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "groupId")
    private Group group;
}
