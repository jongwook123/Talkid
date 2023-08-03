package com.talkids.backend.dm.dto;

import com.talkids.backend.dm.entity.DmJoinMember;
import com.talkids.backend.dm.entity.DmRoom;
import com.talkids.backend.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class DmJoinMemberDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        private String dmRoomId;
        private int memberId;

        @Builder
        public static DmJoinMember saveDmJoinMemberDto(DmRoom dmRoom, Member member){
            return DmJoinMember.builder()
                    .dmRoom(dmRoom)
                    .member(member)
                    .build();
        }
    }

}
