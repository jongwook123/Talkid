package com.talkids.backend.member.dto;

import com.talkids.backend.member.entity.Exp;
import com.talkids.backend.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Builder
public class MemberDto {
    private int memberId;
    private String memberMail;
    private String memberName;
    private Boolean memberActive;
    private String memberIntroduce;
    private String memberImage;
    private int memberFilterCount;
    private MemberTypeDto memberType;
    private SchoolDto school;
    private LanguageDto language;
    private CountryDto country;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static MemberDto fromEntity(Member member){
        return MemberDto.builder()
            .memberId(member.getMemberId())
            .memberMail(member.getMemberMail())
            .memberName(member.getMemberName())
            .memberActive(member.getMemberActive())
            .memberIntroduce(member.getMemberIntroduce())
            .memberImage(member.getMemberImage())
            .memberFilterCount(member.getMemberFilterCount())
            .memberType(MemberTypeDto.fromEntity(member.getMemberType()))
            .school(SchoolDto.fromEntity(member.getSchool()))
            .language(LanguageDto.fromEntity(member.getLanguage()))
            .country(CountryDto.fromEntity(member.getCountry()))
            .createdAt(member.getCreatedAt())
            .updatedAt(member.getUpdatedAt())
            .build();
    }
}
