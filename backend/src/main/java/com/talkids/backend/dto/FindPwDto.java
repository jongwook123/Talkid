package com.talkids.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

public class FindPwDto {

    @Data
    public static class Request {

        @Email
        @NotEmpty(message = "이메일을 입력해주세요.")
        private String memberMail;
    }

}
