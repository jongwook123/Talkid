package com.talkids.backend.meeting.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class AcceptMeetingDto {

    @Getter @Setter
    public static class Request{
        @NotNull(message = "meetingJoinReqId는 필수항목입니다")
        private Integer meetingJoinReqId;
    }
}
