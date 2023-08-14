package com.talkids.backend.language.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PartOfDictDto{
    private String word;
    private String partOfSpeech;        //noun, verb등과 같은 단어의 유형
    private String definition;          //해당 단어 유형에 대한 정의
    private String example;             //해당 정의에 대한 예시
}
