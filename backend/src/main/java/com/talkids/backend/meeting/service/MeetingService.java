package com.talkids.backend.meeting.service;

import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.member.entity.Member;

import java.util.List;

public interface MeetingService {
    
    //Member로부터 빈일정을 가져옵니다
    List<MeetingSchedule> getMeetingScheduleByMember(Member member);
}
