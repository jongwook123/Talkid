package com.talkids.backend.meeting.repository;

import com.talkids.backend.meeting.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, String> {

    Optional<Meeting> findByMeetingId(int meetingId);

}
