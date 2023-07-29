package com.talkids.backend.dto;

import com.talkids.backend.entity.DmRoom;
import com.talkids.backend.entity.Member;
import com.talkids.backend.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class MessageDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request {

//        @NotNull(message = "유저 id는 필수 입니다.")
        private int memberId; // 발신자

        private int dmRoomId;

//        @NotNull(message = "메세지는 필수 입니다.")
        private String messageContent;

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
    public class Response {

        private int memberId;
        private String messageContent;

        public void messageResponseDto(Request req) {
            this.memberId = req.getMemberId();
            this.messageContent = req.getMessageContent();
        }
    }
}
