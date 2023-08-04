package com.talkids.backend.member.dto;

import com.talkids.backend.member.entity.Exp;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder @Getter
public class ExpDto {
    private int expId;
    private int expPoint;
    private LocalDateTime createdAt;

    public static ExpDto fromEntity(Exp exp){
        return ExpDto.builder()
            .expId(exp.getExpId())
            .expPoint(exp.getExpPoint())
            .createdAt(exp.getCreatedAt())
            .build();
    }
}
