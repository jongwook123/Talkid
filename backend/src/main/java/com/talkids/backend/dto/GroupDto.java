package com.talkids.backend.dto;

import com.talkids.backend.entity.Group;
import com.talkids.backend.entity.GroupJoinMember;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public class GroupDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        @NotNull(message = "멤버 ID를 입력해주세요")
        private Integer memberId;

        @Length(min = 1, max = 45)
        @NotBlank(message = "그룹 이름을 입력해주세요")
        private String groupName;
        
        private String groupImage;

        @Builder
        public Group saveGroupDto(){
            return Group.builder()
                    .groupName(groupName)
                    .groupImage(groupImage)
                    .build();
        }
    }

}
