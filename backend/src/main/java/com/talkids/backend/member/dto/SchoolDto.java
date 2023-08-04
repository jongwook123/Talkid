package com.talkids.backend.member.dto;

import com.talkids.backend.member.entity.School;
import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class SchoolDto {
    private int schoolId;
    private String schoolName;
    private String schoolAddress;
    private Double schoolLat;
    private Double schoolLng;

    private CountryDto country;
    private TimeZoneDto timeZone;

    public static SchoolDto fromEntity(School school){
        CountryDto countryDto = CountryDto.fromEntity(school.getCountry());
        TimeZoneDto timeZoneDto = TimeZoneDto.fromEntity(school.getTimeZone());

        return SchoolDto.builder()
            .schoolId(school.getSchoolId())
            .schoolName(school.getSchoolName())
            .schoolAddress(school.getSchoolAddress())
            .schoolLat(school.getSchoolLat())
            .schoolLng(school.getSchoolLng())
            .country(countryDto)
            .timeZone(timeZoneDto)
            .build();
    }
}
