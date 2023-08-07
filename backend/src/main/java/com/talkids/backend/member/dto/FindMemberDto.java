package com.talkids.backend.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class FindMemberDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request {

        @NotBlank(message = "찾으실 정보를 입력해주세요")
        private String info;

        private int infoId;

        private String memberMail;
    }
}
