package com.talkids.backend.meeting.dto;

import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.member.entity.TimeZone;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
public class MeetingWithMineDto {
    private int meetingId;
    private LocalDateTime meetingStart;
    private LocalDateTime meetingEnd;
    private GroupDto groupReq;
    private GroupDto groupRes;
    private LocalDateTime createdAt;

    private Boolean isMine;

    public static MeetingWithMineDto fromEntity(Meeting meeting, boolean isMine){
        return MeetingWithMineDto.builder()
            .meetingId(meeting.getMeetingId())
            .meetingStart(meeting.getMeetingStart())
            .meetingEnd(meeting.getMeetingEnd())
            .groupReq(GroupDto.fromEntity(meeting.getGroupReq()))
            .groupRes(GroupDto.fromEntity(meeting.getGroupRes()))
            .createdAt(meeting.getCreatedAt())
            .isMine(isMine)
            .build();
    }

    public static MeetingWithMineDto fromEntity(Meeting meeting, boolean isMine, TimeZone timeZone){
        LocalDateTime start = meeting.getMeetingStart();
        start = start.plusHours(timeZone.getHour()).plusMinutes(timeZone.getMinute());

        LocalDateTime end = meeting.getMeetingStart();
        end = end.plusHours(timeZone.getHour()).plusMinutes(timeZone.getMinute());

        return MeetingWithMineDto.builder()
            .meetingId(meeting.getMeetingId())
            .meetingStart(start)
            .meetingEnd(end)
            .groupReq(GroupDto.fromEntity(meeting.getGroupReq()))
            .groupRes(GroupDto.fromEntity(meeting.getGroupRes()))
            .createdAt(meeting.getCreatedAt())
            .isMine(isMine)
            .build();
    }

}
