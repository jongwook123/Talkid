package com.talkids.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
