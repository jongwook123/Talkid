package com.talkids.backend.meeting.dto;

import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

public class MyScheduleDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        public List<Meeting> meetings = new ArrayList<>();
        public List<MeetingSchedule> meetingSchedules = new ArrayList<>();
    }
}
