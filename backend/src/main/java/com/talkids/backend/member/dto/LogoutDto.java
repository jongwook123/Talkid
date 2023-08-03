package com.talkids.backend.member.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

public class LogoutDto {

    @Data
    public static class Request {
        @NotEmpty(message = "잘못된 요청입니다.")
        private String accessToken;

        @NotEmpty(message = "잘못된 요청입니다.")
        private String refreshToken;
    }
}
