package com.talkids.backend.common.utils;

import com.talkids.backend.member.entity.TimeZone;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class TimeUtils {

    public String dateTimeFormat(LocalDateTime time){
        StringBuilder sb = new StringBuilder("");
        sb.append(time.getMonthValue()).append(".").append(time.getDayOfMonth())
            .append(" ").append(time.getHour()).append(":").append(time.getMinute());
        return sb.toString();
    }

    public String timeFormat(LocalDateTime time){
        StringBuilder sb = new StringBuilder("");
        sb.append(time.getHour()).append(":").append(time.getMinute());
        return sb.toString();
    }

    public LocalDateTime localize(LocalDateTime time, TimeZone timeZone){
        return time.plusHours(timeZone.getHour()).plusMinutes(timeZone.getMinute());
    }
}
