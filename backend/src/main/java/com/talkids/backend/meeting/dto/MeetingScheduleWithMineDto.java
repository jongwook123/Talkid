package com.talkids.backend.meeting.dto;

import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.entity.GroupJoinMember;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.member.dto.MemberDto;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.entity.TimeZone;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class MeetingScheduleWithMineDto{
    private Integer meetingScheduleId;
    private LocalDateTime meetingScheduleStart;
    private LocalDateTime meetingScheduleEnd;
    private GroupDto group;
    
    private List<MeetingJoinReqDto> reqs;       //해당 일정에 대해 요청 받은 목록

    private Boolean isMine;
    private Boolean sended;

    public static MeetingScheduleWithMineDto fromEntity(MeetingSchedule meetingSchedule, boolean isMine){
        return MeetingScheduleWithMineDto.builder()
            .meetingScheduleId(meetingSchedule.getMeetingScheduleId())
            .meetingScheduleStart(meetingSchedule.getMeetingScheduleStart())
            .meetingScheduleEnd(meetingSchedule.getMeetingScheduleEnd())
            .group(GroupDto.fromEntity(meetingSchedule.getGroup()))
            .isMine(isMine)
            .build();
    }

    public static MeetingScheduleWithMineDto fromEntity(MeetingSchedule meetingSchedule, boolean isMine, boolean sended, TimeZone timeZone){
        LocalDateTime start = meetingSchedule.getMeetingScheduleStart();
        start = start.plusHours(timeZone.getHour()).plusMinutes(timeZone.getMinute());
        LocalDateTime end = meetingSchedule.getMeetingScheduleEnd();
        end = end.plusHours(timeZone.getHour()).plusMinutes(timeZone.getMinute());
        
        List<MeetingJoinReqDto> reqs = new ArrayList<>();
        
        
        if(isMine){
            //만약 나의 빈 일정이면 -> 요청 받은 목록들을 반환해주자
            reqs = meetingSchedule.getMeetingJoinReqs().stream().map(MeetingJoinReqDto::fromEntity).toList();
        }

        return MeetingScheduleWithMineDto.builder()
            .meetingScheduleId(meetingSchedule.getMeetingScheduleId())
            .meetingScheduleStart(start)
            .meetingScheduleEnd(end)
            .group(GroupDto.fromEntity(meetingSchedule.getGroup()))
            .reqs(reqs)
            .isMine(isMine)
            .sended(sended)
            .build();
    }
}
