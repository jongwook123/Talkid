package com.talkids.backend.dm.dto;

import com.talkids.backend.dm.entity.Message;
import com.talkids.backend.dm.entity.UncheckMessage;
import com.talkids.backend.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

public class UncheckMessageDto {

    @Data
    @AllArgsConstructor
    public static class Request {

        @Builder
        public static UncheckMessage saveUncheckMessageDto(Member member, Message message){
            return UncheckMessage.builder()
                    .dmRoom(message.getDmRoom())
                    .member(member)
                    .message(message)
                    .build();
        }
    }


}
