package com.talkids.backend.meeting.repository;

import com.talkids.backend.meeting.entity.MeetingSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface MeetingScheduleRepository extends JpaRepository<MeetingSchedule, Integer> {

}
