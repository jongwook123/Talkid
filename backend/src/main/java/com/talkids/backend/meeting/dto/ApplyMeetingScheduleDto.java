package com.talkids.backend.meeting.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class ApplyMeetingScheduleDto {

    @Getter @Setter
    @Builder
    public static class Request{
        @NotNull(message="meetingScheduleId는 필수입니다")
        private Integer meetingScheduleId;
        @NotNull(message="groupId는 필수입니다")
        private Integer groupId;
    }
}
