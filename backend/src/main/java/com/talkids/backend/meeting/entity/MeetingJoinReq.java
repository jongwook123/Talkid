package com.talkids.backend.meeting.entity;

import com.talkids.backend.group.entity.Group;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="MeetingJoinReq")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingJoinReq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="meetingJoinReqId")
    private int meetingJoinReqId;

    /* ---------------------------------- */

    @ManyToOne
    @JoinColumn(name = "meetingScheduleId")
    private MeetingSchedule meetingSchedule;


    @ManyToOne
    @JoinColumn(name = "groupId")
    private Group group;

}
