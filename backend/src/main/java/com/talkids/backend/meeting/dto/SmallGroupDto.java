package com.talkids.backend.meeting.dto;

import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.meeting.entity.SmallGroup;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

public class SmallGroupDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{

        @NotNull(message = "미팅 ID를 입력해주세요")
        private Integer meetingId;

        @Length(min = 1, max = 45)
        @NotBlank(message = "소그룹 이름을 입력해주세요")
        private String smallGroupName;

        @Builder
        public SmallGroup saveSmallGroupDto(Meeting meeting){
            return SmallGroup.builder()
                    .meeting(meeting)
                    .smallGroupName(smallGroupName)
                    .build();
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private Integer meetingId;
        private Integer smallGroupId;
        private String smallGroupName;
        private String memberName;

        public static Response smallGroupResponseDto(int meetingId, int smallGroupId, String smallGroupName, String memberName) {
            Response response = new SmallGroupDto.Response();
            response.setMeetingId(meetingId);
            response.setSmallGroupId(smallGroupId);
            response.setSmallGroupName(smallGroupName);
            response.setMemberName(memberName);
            return response;
        }
    }
}
