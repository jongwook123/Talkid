package com.talkids.backend.dm.dto;

import com.talkids.backend.dm.entity.DmRoom;
import lombok.*;

@Data
public class DmRoomDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        private String sender;
        private String receiver;
        private String dmRoomId;

        @Builder
        public static DmRoom saveDmRoomDto(String sender, String receiver){
            return DmRoom.builder()
                    .dmRoomId(sender.compareTo(receiver) > 0 ? receiver+"_"+sender : sender+"_"+receiver)
                    .build();
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private int memberId;
        private String dmRoomId;
        private int uncheckMessage;
        private String lastMessage;

        public static Response messageResponseDto(String dmRoomId, int uncheckMessage, String lastMessage) {
            Response response = new Response();
            response.setDmRoomId(dmRoomId);
            response.setUncheckMessage(uncheckMessage);
            response.setLastMessage(lastMessage);
            return response;
        }
    }
}



