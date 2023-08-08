package com.talkids.backend.dm.dto;

import com.talkids.backend.dm.entity.DmRoom;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Data
public class DmRoomDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        @Email
        @Length(min = 1, max = 45)
        @NotBlank(message = "이메일을 입력해주세요")
        private String sender;

        @Email
        @Length(min = 1, max = 45)
        @NotBlank(message = "이메일을 입력해주세요")
        private String receiver;

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

        private String dmRoomId;
        private String memberName;
        private int uncheckMessage;
        private String lastMessage;

        public static Response messageResponseDto(String dmRoomId, String memberName, int uncheckMessage, String lastMessage) {
            Response response = new Response();
            response.setDmRoomId(dmRoomId);
            response.setMemberName(memberName);
            response.setUncheckMessage(uncheckMessage);
            response.setLastMessage(lastMessage);
            return response;
        }
    }
}



