package com.talkids.backend.meeting.dto;

import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@RequiredArgsConstructor @AllArgsConstructor
public class MeetingScheduleDto {
    private Integer meetingScheduleId;
    private LocalDateTime meetingScheduleStart;
    private LocalDateTime meetingScheduleEnd;
    private GroupDto group;

    public static MeetingScheduleDto fromEntity(MeetingSchedule meetingSchedule){
        return MeetingScheduleDto.builder()
            .meetingScheduleId(meetingSchedule.getMeetingScheduleId())
            .meetingScheduleStart(meetingSchedule.getMeetingScheduleStart())
            .meetingScheduleEnd(meetingSchedule.getMeetingScheduleEnd())
            .group(GroupDto.fromEntity(meetingSchedule.getGroup()))
            .build();
    }
}
