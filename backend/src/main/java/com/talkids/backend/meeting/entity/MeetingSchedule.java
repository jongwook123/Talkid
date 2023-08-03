package com.talkids.backend.meeting.entity;

import com.talkids.backend.group.entity.Group;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="MeetingSchedule")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="meetingScheduleId")
    private int meetingScheduleId;

    @Column(name="meetingScheduleStart")
    private LocalDateTime meetingScheduleStart;

    @Column(name="meetingScheduleEnd")
    private LocalDateTime meetingScheduleEnd;

    /* ---------------------------------- */

    @ManyToOne
    @JoinColumn(name = "groupId")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "meetingJoinReqId")
    private MeetingJoinReq meetingJoinReq;

}
