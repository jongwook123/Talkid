package com.talkids.backend.group.dto;

import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.GroupJoinMember;
import com.talkids.backend.member.dto.MemberDto;
import com.talkids.backend.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Builder
@Getter
public class GroupDto {
    private int groupId;
    private String groupName;
    private String groupImage;
    private LocalDateTime createdAt;
    private List<MemberDto> members = new ArrayList<>();
    private MemberDto teacher;

    public static GroupDto fromEntity(Group group){
        MemberDto teacher = null;

        for(GroupJoinMember groupJoinMember : group.getGroupJoinMember()){
            if(groupJoinMember.getMember().getMemberType().getMemberTypeId() == 1){
                //선생님이면
                teacher = MemberDto.fromEntity(groupJoinMember.getMember());
            }
        }

        return GroupDto.builder()
            .groupId(group.getGroupId())
            .groupName(group.getGroupName())
            .groupImage(group.getGroupImage())
            .createdAt(group.getCreatedAt())
            .teacher(teacher)
            .build();
    }

    public static GroupDto fromEntity(Group group, List<GroupJoinMember> groupJoinMembers){
        MemberDto teacher = null;
        List<MemberDto> memberDtos = new LinkedList<>();
        for(GroupJoinMember m: groupJoinMembers){
            Member member = m.getMember();
            memberDtos.add(MemberDto.fromEntity(member));
            if(member.getMemberType().getMemberTypeId() == 1){
                //선생님이면
                teacher = MemberDto.fromEntity(member);
            }
        }

        return GroupDto.builder()
            .groupId(group.getGroupId())
            .groupName(group.getGroupName())
            .groupImage(group.getGroupImage())
            .createdAt(group.getCreatedAt())
            .members(memberDtos)
            .teacher(teacher)
            .build();
    }
}
