package com.talkids.backend.common.service;

import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.entity.TimeZone;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class TimeService {
    public LocalDateTime localToUTC(Member member, LocalDateTime time){
        TimeZone timeZone = member.getSchool().getTimeZone();
        int hour = timeZone.getHour();
        int minute = timeZone.getMinute();

        return null;
    }
}
