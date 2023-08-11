package com.talkids.backend.meeting.dto;

import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.entity.GroupJoinMember;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.member.dto.MemberDto;
import com.talkids.backend.member.entity.Member;
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
}
