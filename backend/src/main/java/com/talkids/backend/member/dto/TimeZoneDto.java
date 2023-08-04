package com.talkids.backend.member.dto;

import com.talkids.backend.member.entity.TimeZone;
import lombok.Builder;
import lombok.Getter;

@Builder @Getter
public class TimeZoneDto {
    private int timeZoneId;
    private String timeZoneName;
    private int hour;
    private int minute;

    public static TimeZoneDto fromEntity(TimeZone timeZone){
        return TimeZoneDto.builder()
            .timeZoneId(timeZone.getTimeZoneId())
            .timeZoneName(timeZone.getTimeZoneName())
            .hour(timeZone.getHour())
            .minute(timeZone.getMinute())
            .build();
    }
}
