package com.talkids.backend.meeting.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class MeetingDto {
    private int meetingId;
    private LocalDateTime meetingStart;
    private LocalDateTime meetingEnd;
}
