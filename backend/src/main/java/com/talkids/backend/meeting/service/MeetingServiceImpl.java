package com.talkids.backend.meeting.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.repository.GroupJoinMemberRepository;
import com.talkids.backend.group.repository.GroupRepository;
import com.talkids.backend.group.service.GroupService;
import com.talkids.backend.meeting.dto.PostMeetingDto;
import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.meeting.entity.MeetingJoinReq;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.meeting.repository.MeetingJoinReqRepository;
import com.talkids.backend.meeting.repository.MeetingRepository;
import com.talkids.backend.meeting.repository.MeetingScheduleRepository;
import com.talkids.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private final GroupRepository groupRepository;
    private final GroupJoinMemberRepository groupJoinMemberRepository;

    private final MeetingRepository meetingRepository;
    private final MeetingScheduleRepository meetingScheduleRepository;
    private final MeetingJoinReqRepository meetingJoinReqRepository;


    @Override
    public List<Meeting> getMeetingsByYearAndMonth(Integer year, Integer month) {
        return meetingRepository.findByYearAndMonth(year, month);
    }

    @Override
    public List<MeetingSchedule> getMeetingSchedulesByYearAndMonth(Integer year, Integer month) throws Exception {
        return meetingScheduleRepository.findByYearAndMonth(year, month);
    }

    //빈 일정을 등록합니다
    public void postEmptyMeeting(Member member, PostMeetingDto.Request body) throws Exception{
        if(member.getMemberType().getMemberTypeId() != 1) throw new Exception("선생님만 일정을 등록할 수 있습니다");
        Optional<Group> group = groupRepository.findByGroupId(body.getGroupId());
        if(group.isEmpty()) throw new NotFoundException("존재하지 않는 그룹입니다");

        groupJoinMemberRepository.findByGroup_GroupIdAndMember_MemberId(body.getGroupId(), member.getMemberId()).orElseThrow(() -> {
           return new NotFoundException("속하지 않은 그룹입니다");
        });


        LocalDateTime start = body.getMeetingStart();
        LocalDateTime end = body.getMeetingEnd();

        //시작시간과 종료시간을 기준으로 겹치는 일정이 있는지 확인하자
        Optional overlap = meetingRepository.findOneByMeetingStartBetween(start, end.minusMinutes(1));
        if(overlap.isPresent()) throw new Exception("겹치는 미팅이 있습니다");
        overlap = meetingRepository.findOneByMeetingEndBetween(start.plusMinutes(1), end);
        if(overlap.isPresent()) throw new Exception("겹치는 미팅이 있습니다");

        overlap = meetingScheduleRepository.findOneByMeetingScheduleStartBetween(start, end.minusMinutes(1));
        if(overlap.isPresent()) throw new Exception("겹치는 미팅이 있습니다");
        overlap = meetingScheduleRepository.findOneByMeetingScheduleEndBetween(start.plusMinutes(1), end);
        if(overlap.isPresent()) throw new Exception("겹치는 미팅이 있습니다");


        MeetingSchedule meetingSchedule = MeetingSchedule.builder()
            .meetingScheduleStart(start)
            .meetingScheduleEnd(end)
            .group(group.get())
            .build();

        meetingScheduleRepository.save(meetingSchedule);
    }

    // 빈 일정에 신청
    @Override
    public void applyMeetingSchedule(Member member, Integer meetingScheduleId, Integer groupId) throws Exception{
        Optional<MeetingSchedule> res = meetingScheduleRepository.findOneByMeetingScheduleId(meetingScheduleId);
        if(res.isEmpty()) throw new Exception("존재하지 않는 일정입니다");

        MeetingSchedule meetingSchedule = res.get();

        if(meetingJoinReqRepository.findOneByMeetingScheduleAndGroup_GroupId(meetingSchedule, groupId).isPresent()){
            //이미 해당 빈일정으로 등록된 경우
            throw new Exception("이미 신청한 일정입니다");
        }

        //신청할려고 하는 그룹을 가져오자
        Optional<Group> group = groupRepository.findByGroupId(groupId);
        if(group.isEmpty()) throw new NotFoundException("존재하지 않는 그룹입니다");
        
        //그룹의 소속원이 아닌데 신청한 경우
        groupJoinMemberRepository.findByGroup_GroupIdAndMember_MemberId(groupId, member.getMemberId()).orElseThrow(() -> {
            return new Exception("해당 그룹에 대한 권한이 없습니다");
        });

        MeetingJoinReq meetingJoinReq = MeetingJoinReq.builder()
            .meetingSchedule(meetingSchedule)
            .group(group.get())
            .build();

        meetingJoinReqRepository.save(meetingJoinReq);

    }
}
