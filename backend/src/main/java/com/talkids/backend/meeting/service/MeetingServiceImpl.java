package com.talkids.backend.meeting.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.common.utils.TimeUtils;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.GroupJoinMember;
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
import com.talkids.backend.member.entity.TimeZone;
import com.talkids.backend.notify.dto.CreateNotifyDto;
import com.talkids.backend.notify.entity.NotifyType;
import com.talkids.backend.notify.service.NotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private final GroupService groupService;
    private final GroupRepository groupRepository;
    private final GroupJoinMemberRepository groupJoinMemberRepository;

    private final MeetingRepository meetingRepository;
    private final MeetingScheduleRepository meetingScheduleRepository;
    private final MeetingJoinReqRepository meetingJoinReqRepository;
    
    private final NotifyService notifyService;
    private final TimeUtils timeUtils;


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

        //각각의 시간에 대해 포맷팅 하기
        String startTime = timeUtils.dateTimeFormat(start);
        String endTime = timeUtils.dateTimeFormat(end);

        StringBuilder headBuilder = new StringBuilder("");
        headBuilder.append(startTime).append(" ~" ).append(endTime).append(" Schedule registered");
        
        CreateNotifyDto.Request notifyBody = CreateNotifyDto.Request.builder()
            .notifyHeader(headBuilder.toString())
            .notifyBody("무엇인가 보낼 본문")
            .notifyType(NotifyType.MATCHING)
            .build();
        
        notifyService.notifyMember(member, member, notifyBody);
    }

    // 빈 일정에 신청
    @Override
    public void applyMeetingSchedule(Member member, Integer meetingScheduleId, Integer groupId) throws Exception{
        Optional<MeetingSchedule> res = meetingScheduleRepository.findOneByMeetingScheduleId(meetingScheduleId);
        if(res.isEmpty()) throw new Exception("존재하지 않는 일정입니다");

        MeetingSchedule meetingSchedule = res.get();

        //멤버(선생)가 속해있는 그룹의 일정에 신청할려고 한 경우
        if(groupJoinMemberRepository.findByGroup_GroupIdAndMember_MemberId(meetingSchedule.getGroup().getGroupId(), member.getMemberId())
            .isPresent()){
            throw new Exception("자기 자신이 속한 그룹에 신청할 수 없습니다");
        }

        //이미 신청된 일정인 경우
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

        //정상적으로 요청을 했으면 이에 대해 알림을 주자
        Group targetGroup = meetingSchedule.getGroup();
        Member targetTeacher = groupService.getGroupTeacher(targetGroup);  //해당 그룹의 장을 가지고 와서
        TimeZone timeZone = member.getSchool().getTimeZone();
        
        LocalDateTime start = meetingSchedule.getMeetingScheduleStart();
        LocalDateTime end = meetingSchedule.getMeetingScheduleEnd();

        String startTime = timeUtils.dateTimeFormat(timeUtils.localize(start, timeZone));
        String endTime = timeUtils.dateTimeFormat(timeUtils.localize(end, timeZone));

        StringBuilder sb = new StringBuilder("");
        sb.append(startTime).append(" ~ ").append(endTime).append(" new meeting request received");

        CreateNotifyDto.Request notifyRequest = CreateNotifyDto.Request.builder()
                .notifyHeader("New meeting request")
                .notifyBody(sb.toString())
                .notifyType(NotifyType.MATCHING)
                .build();
        notifyService.notifyMember(member, targetTeacher, notifyRequest);
    }

    //매칭 성사 요청 받은 목록 반환
    @Override
    public List<MeetingJoinReq> getReceivedRequest(Member member) {
        List<Group> groups = groupRepository.findByGroupJoinMember_Member_MemberIdOrderByCreatedAtDesc(member.getMemberId());
        List<MeetingJoinReq> received = new LinkedList<>();

        for(Group group: groups){
            //내가 속한 그룹들을 돌면서
            
            //해당 그룹의 빈일정을 가져와서
            List<MeetingSchedule> meetingSchedules = group.getMeetingSchedules();

            for(MeetingSchedule meetingSchedule: meetingSchedules){
                //빈 일정들에 연결된 요청들을 받아와서 넣어주자
                List<MeetingJoinReq> reqs =  meetingSchedule.getMeetingJoinReqs();
                received.addAll(reqs);
            }
        }

        return received;
    }

    // 매칭 성사 신청 한 목록 반환
    @Override
    public List<MeetingJoinReq> getSendRequest(Member member) {
        List<Group> groups = groupRepository.findByGroupJoinMember_Member_MemberIdOrderByCreatedAtDesc(member.getMemberId());

        List<MeetingJoinReq> sends = meetingJoinReqRepository.findAllByGroupIn(groups);

        return sends;
    }

    // 매칭 신청에 대해 수락 처리
    @Override
    public void acceptRequest(Member member, Integer meetingJoinReqId) throws Exception {
        MeetingJoinReq meetingJoinReq = meetingJoinReqRepository.findById(meetingJoinReqId).orElseThrow(() -> {
            return new Exception("존재하지 않는 미팅 신청입니다");
        });
        //해당 미팅 신청에 대해 그룹을 가져오고
        Group ownerGroup = meetingJoinReq.getMeetingSchedule().getGroup();

        groupJoinMemberRepository.findByGroup_GroupIdAndMember_MemberId(ownerGroup.getGroupId(), member.getMemberId())
            .orElseThrow(() -> {
                return new Exception("신청에 대해 수락 할 권한이 없습니다");
            });

        MeetingSchedule meetingSchedule = meetingJoinReq.getMeetingSchedule();
        LocalDateTime meetingStart = meetingSchedule.getMeetingScheduleStart();
        LocalDateTime meetingEnd = meetingSchedule.getMeetingScheduleEnd();
        Group groupReq = meetingJoinReq.getGroup(); //미팅에 대해 신청한 그룹
        Group groupRes = ownerGroup;                //미팅을 올렸던 사람

        Meeting newMeeting = Meeting.builder()
            .meetingStart(meetingStart)
            .meetingEnd(meetingEnd)
            .groupReq(groupReq)
            .groupRes(groupRes)
            .build();

        //성사된 미팅을 넣어주고
        meetingRepository.save(newMeeting);
        
        //빈 일정 목록에 있던 것은 지워주자
        meetingScheduleRepository.delete(meetingSchedule);

        String startTime = timeUtils.dateTimeFormat(meetingStart);
        String endTime = timeUtils.dateTimeFormat(meetingEnd);

        StringBuilder headBuilder = new StringBuilder("");
        headBuilder.append(startTime).append(" ~ ").append(endTime).append(" Meeting matched");
        
        CreateNotifyDto.Request body = CreateNotifyDto.Request.builder()
                                        .notifyHeader(headBuilder.toString())
                                        .notifyBody(String.valueOf(newMeeting.getMeetingId()))
                                        .notifyType(NotifyType.MEETING_START)
                                        .build();
        notifyService.notifyGroup(groupRes, body);
        notifyService.notifyGroup(groupReq, body);
        
    }

    //요청에 대해 거절하기
    @Override
    public void rejectRequest(Member member, Integer meetingJoinReqId) throws Exception {
        MeetingJoinReq meetingJoinReq = meetingJoinReqRepository.findById(meetingJoinReqId).orElseThrow(() -> {
            return new Exception("존재하지 않는 미팅 신청입니다");
        });
        //해당 미팅 신청에 대해 그룹을 가져오고
        Group ownerGroup = meetingJoinReq.getMeetingSchedule().getGroup();

        groupJoinMemberRepository.findByGroup_GroupIdAndMember_MemberId(ownerGroup.getGroupId(), member.getMemberId())
            .orElseThrow(() -> {
                return new Exception("신청에 대해 수락 할 권한이 없습니다");
            });
        
        //거절 한다는 뜻은 해당 요청을 삭제 한다는 뜻이다
        meetingJoinReqRepository.delete(meetingJoinReq);

        //거절당한 그룹에게 알림을 주자
        Member ownerTeacher = groupService.getGroupTeacher(ownerGroup);
        Group requestGroup = meetingJoinReq.getGroup();
        Member requestTeacher = groupService.getGroupTeacher(requestGroup);

        LocalDateTime start = meetingJoinReq.getMeetingSchedule().getMeetingScheduleStart();
        LocalDateTime end = meetingJoinReq.getMeetingSchedule().getMeetingScheduleEnd();

        String formattedStart = timeUtils.dateTimeFormat(start);
        String formattedEnd = timeUtils.dateTimeFormat(end);

        StringBuilder sb = new StringBuilder("");
        sb.append(formattedStart).append(" ~ ").append(formattedEnd).append(" meeting request rejected");

        CreateNotifyDto.Request body = CreateNotifyDto.Request.builder()
                                        .notifyHeader("Matching rejected")
                                        .notifyBody(sb.toString())
                                        .notifyType(NotifyType.MATCHING)
                                        .build();
        notifyService.notifyMember(ownerTeacher, requestTeacher, body);
    }

    @Override
    public Meeting getMeetingByMeetingId(Integer meetingId) throws Exception {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(()-> new NotFoundException("존재하지 않는 미팅입니다"));
        return meeting;
    }
}
