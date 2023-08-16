package com.talkids.backend.meeting.repository;

import com.talkids.backend.group.entity.Group;
import com.talkids.backend.meeting.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

//성사된 미팅에 대해 관리
public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
        @Query("select m from Meeting m where m.groupReq in (:groups) " +
            "and year(m.meetingStart) = :year and month(m.meetingStart) = :month")
        List<Meeting> findByGroupReqInAndYearAndMonth(List<Group> groups, Integer year, Integer month);

        @Query("select m from Meeting m where year(m.meetingStart) = :year and month(m.meetingStart) = :month")
        List<Meeting> findByYearAndMonth(Integer year, Integer month);

        Optional<Meeting> findOneByMeetingStartBetween(LocalDateTime start, LocalDateTime end);
        Optional<Meeting> findOneByMeetingEndBetween(LocalDateTime start, LocalDateTime end);

        @Query(value = "SELECT * from Meeting m WHERE m.meeting_start >= DATE_SUB(NOW(), INTERVAL :minute minute) AND m.meeting_start > NOW()", nativeQuery = true)
        List<Meeting> findByMinute(Long minute);
}
