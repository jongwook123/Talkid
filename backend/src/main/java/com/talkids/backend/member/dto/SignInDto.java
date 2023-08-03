package com.talkids.backend.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class SignInDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        @NotBlank(message = "이메일을 입력해주세요")
        private String memberMail;

        @NotBlank(message = "비밀번호를 입력해주세요")
        private String memberPassword;
    }

}
