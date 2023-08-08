package com.talkids.backend.dm.dto;

import com.talkids.backend.dm.entity.DmRoom;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.dm.entity.Message;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

public class MessageDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request {

        @Email
        @Length(min = 1, max = 45)
        @NotBlank(message = "이메일을 입력해주세요")
        private String sender;

        @Email
        @Length(min = 1, max = 45)
        @NotBlank(message = "이메일을 입력해주세요")
        private String receiver;

        @NotBlank(message = "메세지를 입력해주세요")
        private String messageContent;
        
        @NotNull(message = "읽음 여부를 입력해주세요")
        private boolean readCheck;

        @Builder
        public Message saveMessageDto(DmRoom dmRoom, Member member){
            return Message.builder()
                    .dmRoom(dmRoom)
                    .member(member)
                    .messageContent(messageContent)
                    .build();
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private String memberMail;
        private String messageContent;
        private LocalDateTime createdAt;

        public static Response messageResponseDto(String memberMail, String messageContent, LocalDateTime createdAt) {
            MessageDto.Response response = new MessageDto.Response();
            response.setMemberMail(memberMail);
            response.setMessageContent(messageContent);
            response.setCreatedAt(createdAt);
            return response;
        }
    }
}
