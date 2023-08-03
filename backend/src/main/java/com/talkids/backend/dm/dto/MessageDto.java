package com.talkids.backend.dm.dto;

import com.talkids.backend.dm.entity.DmRoom;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.dm.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class MessageDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request {

        private String memberMail;
        private String dmRoomId;
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
}
