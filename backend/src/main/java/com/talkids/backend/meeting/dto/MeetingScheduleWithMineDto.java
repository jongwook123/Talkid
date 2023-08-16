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

@Getter
@Builder
public class MeetingScheduleWithMineDto{
    private Integer meetingScheduleId;
    private LocalDateTime meetingScheduleStart;
    private LocalDateTime meetingScheduleEnd;
    private GroupDto group;

    private Boolean isMine;

    public static MeetingScheduleWithMineDto fromEntity(MeetingSchedule meetingSchedule, boolean isMine){
        return MeetingScheduleWithMineDto.builder()
            .meetingScheduleId(meetingSchedule.getMeetingScheduleId())
            .meetingScheduleStart(meetingSchedule.getMeetingScheduleStart())
            .meetingScheduleEnd(meetingSchedule.getMeetingScheduleEnd())
            .group(GroupDto.fromEntity(meetingSchedule.getGroup()))
            .isMine(isMine)
            .build();
    }

    public static MeetingScheduleWithMineDto fromEntity(MeetingSchedule meetingSchedule, boolean isMine, TimeZone timeZone){
        LocalDateTime start = meetingSchedule.getMeetingScheduleStart();
        start = start.plusHours(timeZone.getHour()).plusMinutes(timeZone.getMinute());
        LocalDateTime end = meetingSchedule.getMeetingScheduleEnd();
        end = end.plusHours(timeZone.getHour()).plusMinutes(timeZone.getMinute());

        return MeetingScheduleWithMineDto.builder()
            .meetingScheduleId(meetingSchedule.getMeetingScheduleId())
            .meetingScheduleStart(start)
            .meetingScheduleEnd(end)
            .group(GroupDto.fromEntity(meetingSchedule.getGroup()))
            .isMine(isMine)
            .build();
    }
}
