package com.talkids.backend.dm.dto;

import com.talkids.backend.dm.entity.DmJoinMember;
import com.talkids.backend.dm.entity.DmRoom;
import com.talkids.backend.member.entity.Member;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

public class DmJoinMemberDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{
        
        @NotBlank(message = "DM방 ID를 입력해주세요")
        private String dmRoomId;

        @Email
        @Length(min = 1, max = 45)
        @NotBlank(message = "이메일을 입력해주세요")
        private String memberMail;

        @Builder
        public static DmJoinMember saveDmJoinMemberDto(DmRoom dmRoom, Member member){
            return DmJoinMember.builder()
                    .dmRoom(dmRoom)
                    .member(member)
                    .build();
        }
    }

}
