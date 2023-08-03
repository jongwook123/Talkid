package com.talkids.backend.meeting.repository;

import com.talkids.backend.meeting.entity.SmallGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SmallGroupRepository  extends JpaRepository<SmallGroup, String> {

    List<SmallGroup> findByMeeting_MeetingIdOrderBySmallGroupName(int meetingId);

    Optional<SmallGroup> findBySmallGroupId(int smallGroupId);

    int deleteBySmallGroupId(int smallGroupId);
}
