package com.talkids.backend.member.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

@Builder
@Getter
public class FollowerDto {

    @Data
    public static class Response {

        private String memberMail;
        private Map<String, ?> followCnt;
        private String followMemberMail;
        private LocalDateTime createdAt;

        public static Response FollowerResponseDto(String memberMail, Map<String, ?> followCnt, String followMemberMail, LocalDateTime createdAt) {
            Response response = new FollowerDto.Response();
            response.setMemberMail(memberMail);
            response.setFollowCnt(followCnt);
            response.setFollowMemberMail(followMemberMail);
            response.setCreatedAt(createdAt);
            return response;
        }
    }

    @Data
    public static class InfoResponse{

        private int followMemberId;
        private String followMemberName;
        private String followMemberMail;

        public static InfoResponse InfoResponseDto(int followMemberId, String followMemberName, String followMemberMail) {
            InfoResponse InfoResponse = new FollowerDto.InfoResponse();
            InfoResponse.setFollowMemberId(followMemberId);
            InfoResponse.setFollowMemberName(followMemberName);
            InfoResponse.setFollowMemberMail(followMemberMail);

            return InfoResponse;
        }
    }
}