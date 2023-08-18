package com.talkids.backend.member.dto;

import com.talkids.backend.language.entity.Language;
import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class LanguageDto {
    private int languageId;
    private String languageCode;
    private String languageEng;
    private String languageOri;

    public static LanguageDto fromEntity(Language language){
        return LanguageDto.builder()
            .languageId(language.getLanguageId())
            .languageCode(language.getLanguageCode())
            .languageEng(language.getLanguageEng())
            .languageOri(language.getLanguageOri())
            .build();
    }
}
