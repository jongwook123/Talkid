package com.talkids.backend.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class ReissueRefreshTokenDto {

    @Getter
    public static class Request{
        private String refreshToken;
    }

    @Getter @Setter @Builder
    public static class Response{
        private String refreshToken;
        private String accesstoken;
    }
}
