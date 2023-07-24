package com.talkids.backend.dto;

import com.talkids.backend.entity.Country;
import com.talkids.backend.entity.Language;
import com.talkids.backend.entity.Member;
import com.talkids.backend.entity.School;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

public class MemberSignUpDto {

   @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private String memberMail;
        private String memberPassword;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request{

        @NotBlank(message = "이메일을 입력해주세요")
        private String memberMail;

        @NotBlank(message = "비밀번호를 입력해주세요")
        private String memberPassword;

        @NotBlank(message = "이름을 입력해주세요")
        private String memberName;

        @NotBlank(message = "학교를 입력해주세요")
        private String schoolName;

        @NotBlank(message = "국가를 입력해주세요")
        private String countryName;

        @NotBlank(message = "언어를 입력해주세요")
        private String languageCode;

        @Builder
        public Member saveTeacherDto(String encodePassword, School school, Language language, Country country){
            return Member.builder()
                    .memberMail(memberMail)
                    .memberPassword(encodePassword)
                    .memberName(memberName)
                    .school(school)
                    .language(language)
                    .country(country)
                    .build();
        }
    }


}
