package com.talkids.backend.member.dto;

import com.talkids.backend.member.entity.MemberType;
import lombok.Builder;
import lombok.Getter;

@Builder @Getter
public class MemberTypeDto {
    private int memberTypeId;
    private String memberTypeName;

    public static MemberTypeDto fromEntity(MemberType memberType){
        return MemberTypeDto.builder()
            .memberTypeId(memberType.getMemberTypeId())
            .memberTypeName(memberType.getMemberTypeName())
            .build();
    }
}
