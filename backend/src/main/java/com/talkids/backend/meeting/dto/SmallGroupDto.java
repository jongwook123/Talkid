package com.talkids.backend.meeting.dto;

import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.meeting.entity.SmallGroup;
import com.talkids.backend.meeting.entity.SmallGroupMember;
import com.talkids.backend.member.dto.MemberDto;
import com.talkids.backend.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter @Builder
public class SmallGroupDto {
    private Integer smallGroupId;
    private String smallGroupName;
    private MeetingDto meeting;
    private List<MemberDto> members;

    public static SmallGroupDto fromEntity(SmallGroup smallGroup){
        return SmallGroupDto.builder()
            .smallGroupId(smallGroup.getSmallGroupId())
            .smallGroupName(smallGroup.getSmallGroupName())
            .build();
    }

    public static SmallGroupDto fromEntity(SmallGroup smallGroup, Meeting meeting){
        return SmallGroupDto.builder()
            .smallGroupId(smallGroup.getSmallGroupId())
            .smallGroupName(smallGroup.getSmallGroupName())
            .meeting(MeetingDto.fromEntity(meeting))
            .build();
    }

    public static SmallGroupDto fromEntity(SmallGroup smallGroup, List<SmallGroupMember> members){
        List<MemberDto> memberDtos = members.stream().map((m) -> MemberDto.fromEntity(m.getMember())).toList();

        return SmallGroupDto.builder()
            .smallGroupId(smallGroup.getSmallGroupId())
            .smallGroupName(smallGroup.getSmallGroupName())
            .members(memberDtos)
            .build();
    }
}
