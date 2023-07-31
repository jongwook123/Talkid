package com.talkids.backend.dm.dto;

import com.talkids.backend.dm.entity.DmRoom;
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
