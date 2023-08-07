package com.talkids.backend.meeting.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class PostMeetingDto {

    @Builder @Getter @Setter
    public static class Request{
        
        @NotEmpty(message="groupId는 필수입니다")
        private Integer groupId;
        @NotEmpty(message="meetingStart는 필수입니다")
        private LocalDateTime meetingStart;
        @NotEmpty(message="meetingEnd는 필수입니다")
        private LocalDateTime meetingEnd;
    }
}
