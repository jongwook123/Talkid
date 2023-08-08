package com.talkids.backend.meeting.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class PostMeetingDto {

    @Builder @Getter @Setter
    public static class Request{
        
        @NotNull(message="groupId는 필수입니다")
        private Integer groupId;

        @NotNull(message="meetingStart는 필수입니다")
        private LocalDateTime meetingStart;

        @NotNull(message="meetingEnd는 필수입니다")
        private LocalDateTime meetingEnd;
    }
}
