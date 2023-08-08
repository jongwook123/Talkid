package com.talkids.backend.member.dto;

import com.talkids.backend.member.entity.Country;
import lombok.Builder;
import lombok.Getter;

@Builder @Getter
public class CountryDto {
    private int countryId;
    private String countryCode;
    private String countryName;
    private String countryImage;

    public static CountryDto fromEntity(Country country){
        return CountryDto.builder()
            .countryId(country.getCountryId())
            .countryCode(country.getCountryCode())
            .countryName(country.getCountryName())
            .countryImage(country.getCountryImage())
            .build();
    }
}
