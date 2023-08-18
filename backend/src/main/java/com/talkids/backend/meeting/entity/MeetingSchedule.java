package com.talkids.backend.meeting.entity;

import com.talkids.backend.group.entity.Group;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

// 빈일정
@Entity
@Table(name="MeetingSchedule")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy="meetingSchedule", cascade = CascadeType.REMOVE)
    private List<MeetingJoinReq> meetingJoinReqs;
}
