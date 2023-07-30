package com.talkids.backend.dto;

import com.talkids.backend.entity.DmJoinMember;
import com.talkids.backend.entity.Group;
import com.talkids.backend.entity.GroupJoinMember;
import com.talkids.backend.entity.Member;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class GroupJoinMemberDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        @NotNull(message = "그룹 ID를 입력해주세요")
        private Integer groupId;

        @NotNull(message = "멤버 ID를 입력해주세요")
        private Integer memberId;

        @Builder
        public static GroupJoinMember saveGroupJoinMemberDto(Group groups, Member member){
            return GroupJoinMember.builder()
                    .group(groups)
                    .member(member)
                    .build();
        }
    }

}
