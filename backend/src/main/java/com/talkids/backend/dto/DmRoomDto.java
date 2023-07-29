package com.talkids.backend.dto;

import com.talkids.backend.entity.DmJoinMember;
import com.talkids.backend.entity.DmRoom;
import com.talkids.backend.entity.Member;
import lombok.*;

@Data
public class DmRoomDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        private int dmRoomId;

        @Builder
        public static DmRoom saveDmRoomDto(){
            return DmRoom.builder()
                    .deletedAt(false)
                    .build();
        }
    }

}
