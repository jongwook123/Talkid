package com.talkids.backend.group.dto;

import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.GroupJoinMember;
import com.talkids.backend.member.entity.Member;
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

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Member member;
        private int totalExp;
        private int monthExp;

        public static GroupJoinMemberDto.Response groupJoinMemberDto(Member member, int totalExp, int monthExp) {
            GroupJoinMemberDto.Response response = new GroupJoinMemberDto.Response();
            response.setMember(member);
            response.setTotalExp(totalExp);
            response.setMonthExp(monthExp);
            return response;
        }
    }

}
