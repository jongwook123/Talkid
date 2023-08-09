package com.talkids.backend.member.dto;

import com.talkids.backend.member.entity.BookMark;
import com.talkids.backend.member.entity.Exp;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class BookMarkDto {

    private int bookMarkId;
    private String bookMarkOriContent;
    private String bookMarkTransContent;
    private LocalDateTime createdAt;

    public static BookMarkDto fromEntity(BookMark bookMark){
        return BookMarkDto.builder()
                .bookMarkId(bookMark.getBookMarkId())
                .bookMarkOriContent(bookMark.getBookMarkOriContent())
                .bookMarkTransContent(bookMark.getBookMarkTransContent())
                .createdAt(bookMark.getCreatedAt())
                .build();
    }
}
