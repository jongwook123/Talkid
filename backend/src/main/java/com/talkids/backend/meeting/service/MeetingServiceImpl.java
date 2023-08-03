package com.talkids.backend.meeting.service;

import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.meeting.repository.MeetingScheduleRepository;
import com.talkids.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private final MeetingScheduleRepository meetingScheduleRepository;

    //Member로부터 빈일정을 가져옵니다
    public List<MeetingSchedule> getMeetingScheduleByMember(Member member) {
        return meetingScheduleRepository.findAllByMember(member);
    }
}
