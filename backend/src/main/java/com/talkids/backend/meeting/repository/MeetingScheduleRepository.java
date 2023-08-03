package com.talkids.backend.meeting.repository;

import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingScheduleRepository extends JpaRepository<MeetingSchedule, Integer> {
    List<MeetingSchedule> findAllByMember(Member member);
}
