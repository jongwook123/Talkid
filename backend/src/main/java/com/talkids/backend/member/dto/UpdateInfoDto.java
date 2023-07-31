package com.talkids.backend.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

public class UpdateInfoDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request{

        @Length(min = 1, max = 100)
        @NotBlank(message = "비밀번호를 입력해주세요")
        private String memberPassword;

        private int countryId;

        private int languageId;

        // 사진
        // private MultipartFile file;

        // 자기소개
        private String memberIntroduce;

    }
}
