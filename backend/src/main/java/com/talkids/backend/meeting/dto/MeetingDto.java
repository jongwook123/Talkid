package com.talkids.backend.meeting.dto;

import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.meeting.entity.Meeting;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter @RequiredArgsConstructor @AllArgsConstructor
public class MeetingDto {
    private int meetingId;
    private LocalDateTime meetingStart;
    private LocalDateTime meetingEnd;
    private Integer groupId;
    private GroupDto groupReq;
    private GroupDto groupRes;
    private LocalDateTime createdAt;

    public static MeetingDto fromEntity(Meeting meeting){
        return MeetingDto.builder()
            .meetingId(meeting.getMeetingId())
            .meetingStart(meeting.getMeetingStart())
            .meetingEnd(meeting.getMeetingEnd())
            .groupReq(GroupDto.fromEntity(meeting.getGroupReq()))
            .groupRes(GroupDto.fromEntity(meeting.getGroupRes()))
            .createdAt(meeting.getCreatedAt())
            .build();
    }
}
