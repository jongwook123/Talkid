package com.talkids.backend.meeting.dto;

import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

public class GetMyMeetingDto {

    @Getter
    public static class Request{
        private Integer year;
        private Integer month;
    }

    @Getter @Builder
    public static class Response{
        public List<MeetingWithMineDto> meetings = new ArrayList<>();
        public List<MeetingScheduleWithMineDto> meetingSchedules = new ArrayList<>();
    }
}
