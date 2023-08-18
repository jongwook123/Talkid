package com.talkids.backend.member.dto;

import com.talkids.backend.language.entity.Language;
import com.talkids.backend.member.entity.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.Length;

public class SignUpDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request{

        @Email
        @Length(min = 1, max = 45)
        @NotBlank(message = "이메일을 입력해주세요")
        private String memberMail;

        @Length(min = 1, max = 100)
        @NotBlank(message = "비밀번호를 입력해주세요")
        private String memberPassword;

        @Length(min = 1, max = 100)
        @NotBlank(message = "이름을 입력해주세요")
        private String memberName;

        private int schoolId;

        private int countryId;

        private int languageId;

        private int memberTypeId;

        @Builder
        public Member saveMemberDto(String encodePassword, School school, Language language, Country country, MemberType memberType){
            return Member.builder()
                    .memberMail(memberMail)
                    .memberPassword(encodePassword)
                    .memberName(memberName)
                    .school(school)
                    .language(language)
                    .country(country)
                    .memberType(memberType)
                    .memberActive(false)
                    .deletedAt(false)
                    .build();
        }
    }
}
