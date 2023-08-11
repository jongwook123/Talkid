package com.talkids.backend.group.dto;

import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.MemberApply;
import com.talkids.backend.member.entity.Member;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class MemberApproveDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        @NotNull(message = "그룹 ID를 입력해주세요")
        private Integer groupId;

        @NotNull(message = "학생 ID를 입력해주세요")
        private Integer memberId;

    }
}
