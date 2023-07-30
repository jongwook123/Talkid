package com.talkids.backend.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.dto.GroupDto;
import com.talkids.backend.dto.GroupJoinMemberDto;
import com.talkids.backend.entity.Group;
import com.talkids.backend.entity.GroupJoinMember;
import com.talkids.backend.entity.Member;
import com.talkids.backend.repository.GroupJoinMemberRepository;
import com.talkids.backend.repository.GroupRepository;
import com.talkids.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GroupServiceImpl implements GroupService {

    private final MemberRepository memberRepository;
    private final GroupJoinMemberRepository groupJoinMemberRepository;
    private final GroupRepository groupRepository;

    /** 그룹 리스트 조회 */
    @Override
    public List<Group> getGroupList(int memberId) {
        return groupRepository.findByGroup(memberId);
    }

    /** 그룹 개설 */
    @Transactional
    @Override
    public int createGroup(GroupDto.Request req) throws NotFoundException, Exception {
        Member member = memberRepository.findByMemberId(req.getMemberId())
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));

        if(member.getMemberType().getMemberTypeId() == 2)
            throw new Exception("학생은 그룹을 만들 수 없습니다.");

        // groups 테이블에 저장
        Group group = groupRepository.save(req.saveGroupDto());

        // group_member_join 테이블에 저장
        groupJoinMemberRepository.save(GroupJoinMemberDto.Request.saveGroupJoinMemberDto(
                groupRepository.findByGroupId(group.getGroupId()),
                member
        ));

        return group.getGroupId();
    }

}
