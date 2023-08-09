package com.talkids.backend.group.dto;

import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.GroupJoinMember;
import com.talkids.backend.member.dto.MemberDto;
import com.talkids.backend.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Builder
@Getter
public class GroupDto {
    private int groupId;
    private String groupName;
    private String groupImage;
    private List<MemberDto> members = new ArrayList<>();

    public static GroupDto fromEntity(Group group){
        return GroupDto.builder()
            .groupId(group.getGroupId())
            .groupName(group.getGroupName())
            .groupImage(group.getGroupImage())
            .build();
    }

    public static GroupDto fromEntity(Group group, List<GroupJoinMember> groupJoinMembers){
        List<MemberDto> memberDtos = new LinkedList<>();
        for(GroupJoinMember m: groupJoinMembers){
            Member member = m.getMember();
            memberDtos.add(MemberDto.fromEntity(member));
        }

        return GroupDto.builder()
            .groupId(group.getGroupId())
            .groupName(group.getGroupName())
            .groupImage(group.getGroupImage())
            .members(memberDtos)
            .build();
    }
}
