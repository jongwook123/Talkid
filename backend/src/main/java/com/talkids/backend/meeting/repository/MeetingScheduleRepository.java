package com.talkids.backend.meeting.repository;

import com.talkids.backend.group.entity.Group;
import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


//성사되지 않은 미팅을 관리
public interface MeetingScheduleRepository extends JpaRepository<MeetingSchedule, Integer> {
    @Query("select m from MeetingSchedule m where m.group in (:groups) " +
        "and year(m.meetingScheduleStart) = :year and month(m.meetingScheduleStart) = :month")
    List<MeetingSchedule> findByGroupReqInAndYearAndMonth(List<Group> groups, Integer year, Integer month);

    @Query("select m from MeetingSchedule m where year(m.meetingScheduleStart) = :year and month(m.meetingScheduleStart) = :month")
    List<MeetingSchedule> findByYearAndMonth(Integer year, Integer month);

    Optional<MeetingSchedule> findOneByMeetingScheduleStartBetween(LocalDateTime start, LocalDateTime end);
    Optional<MeetingSchedule> findOneByMeetingScheduleEndBetween(LocalDateTime start, LocalDateTime end);

    Optional<MeetingSchedule> findOneByMeetingScheduleId(Integer meetingScheduleId);
}
