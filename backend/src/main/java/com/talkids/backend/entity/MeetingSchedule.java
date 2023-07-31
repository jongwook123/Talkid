package com.talkids.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
