package com.talkids.backend.meeting.repository;

import com.talkids.backend.meeting.entity.MeetingJoinReq;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingJoinReqRepository extends JpaRepository<MeetingJoinReq, Integer> {
    Optional<MeetingJoinReq> findOneByMeetingScheduleAndGroup_GroupId(MeetingSchedule meetingSchedule, Integer groupId);
}
