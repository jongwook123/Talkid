package com.talkids.backend.member.dto;

import com.talkids.backend.member.entity.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

public class AddBookMarkDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request{

        @NotBlank(message = "bookMarkOriContent는 필수 항목입니다")
        private String bookMarkOriContent;

        @NotBlank(message = "bookMarkTransContent는 필수 항목입니다")
        private String bookMarkTransContent;

        @Builder
        public BookMark saveBookMarkDto(Member member){
            return BookMark.builder()
                    .bookMarkOriContent(bookMarkOriContent)
                    .bookMarkTransContent(bookMarkTransContent)
                    .member(member)
                    .build();
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private String bookMarkOriContent;
        private String bookMarkTransContent;
        private LocalDateTime createdAt;

        public static Response BookMarkResponseDto(String bookMarkOriContent, String bookMarkTransContent, LocalDateTime createdAt) {
            Response response = new AddBookMarkDto.Response();
            response.setBookMarkOriContent(bookMarkOriContent);
            response.setBookMarkTransContent(bookMarkTransContent);
            response.setCreatedAt(createdAt);
            return response;
        }
    }
}
