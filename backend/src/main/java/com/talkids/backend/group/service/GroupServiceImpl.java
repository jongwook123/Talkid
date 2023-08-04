package com.talkids.backend.group.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.dto.GroupJoinMemberDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.MemberApply;
import com.talkids.backend.group.repository.MemberApplyRepository;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.group.repository.GroupJoinMemberRepository;
import com.talkids.backend.group.repository.GroupRepository;
import com.talkids.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GroupServiceImpl implements GroupService {

    private final MemberRepository memberRepository;
    private final GroupJoinMemberRepository groupJoinMemberRepository;
    private final GroupRepository groupRepository;
    private final MemberApplyRepository memberApplyRepository;

    /** 선생님 - 그룹 리스트 조회 */
    @Override
    public List<Group> getGroupList(int memberId) throws NotFoundException{
        if(memberRepository.findByMemberId(memberId).isEmpty())
            throw new NotFoundException("회원 정보가 없습니다.");

        return groupRepository.findByGroupJoinMember_Member_MemberIdOrderByCreatedAtDesc(memberId);
    }

    /** 선생님 - 그룹 개설 */
    @Transactional
    @Override
    public int createGroup(GroupDto.Request req) throws NotFoundException {
        Member member = memberRepository.findByMemberId(req.getMemberId())
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));

        if(member.getMemberType().getMemberTypeId() == 2)
            throw new NotFoundException("학생은 그룹을 만들 수 없습니다.");

        // groups 테이블에 저장
        Group group = groupRepository.save(req.saveGroupDto());

        // group_member_join 테이블에 저장
        groupJoinMemberRepository.save(
            GroupJoinMemberDto.Request.saveGroupJoinMemberDto(
                groupRepository.findByGroupId(group.getGroupId()).get(),
                member
            )
        );

        return group.getGroupId();
    }

    /** 학생 - 그룹 신청 */
    @Transactional
    @Override
    public int joinGroup(MemberApplyDto.Request req) throws NotFoundException {
        
        Member member = memberRepository.findByMemberId(req.getMemberId())
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));
        Group group = groupRepository.findByGroupId(req.getGroupId())
                .orElseThrow(()-> new NotFoundException("그룹 정보가 없습니다."));

        if(member.getMemberType().getMemberTypeId() == 1) {
            throw new NotFoundException("선생님은 다른 그룹에 가입할 수 없습니다.");
        } else if(memberApplyRepository
                .findByGroup_GroupIdAndMember_MemberId(req.getGroupId(), req.getMemberId())
                .isPresent()) {
            throw new NotFoundException("승인 대기 중인 학생입니다.");
        } else if(groupJoinMemberRepository
                .findByGroup_GroupIdAndMember_MemberId(req.getGroupId(), req.getMemberId())
                .isPresent())
            throw new NotFoundException("이미 가입한 학생입니다.");
        
        // memberApply 테이블에 저장
        memberApplyRepository.save(
            req.saveMemberApplyDto(group, member)
        );

        return req.getMemberId();
    }

    /** 선생님 - 신청 내역 조회 */
    @Override
    public List<?> getApplyList(int groupId) throws NotFoundException {
        return memberApplyRepository.findByGroup(groupId);
    }

    /** 선생님 - 신청 승인 */
    @Transactional
    @Override
    public int applyApproved(MemberApplyDto.Request req) throws NotFoundException {
        
        if(groupJoinMemberRepository.findByGroup_GroupIdAndMember_MemberId(req.getGroupId(), req.getMemberId()).isPresent())
                throw new NotFoundException("이미 가입한 학생입니다.");

        MemberApply memberApply = memberApplyRepository
                .findByGroup_GroupIdAndMember_MemberId(req.getGroupId(), req.getMemberId())
                .orElseThrow(()-> new NotFoundException("신청 정보가 없습니다."));

        // memberApply 테이블에서 해당 신청내역 지우기
        memberApplyRepository.deleteByGroup_GroupIdAndMember_MemberId(req.getGroupId(), req.getMemberId());

        // groupJoinMember 테이블에 학생 정보 넣기
        groupJoinMemberRepository.save(
            GroupJoinMemberDto.Request.saveGroupJoinMemberDto(
                    memberApply.getGroup(),
                    memberApply.getMember()
            )
        );

        // memberActive 변경
        memberApply.getMember().setMemberActive(true);

        return req.getMemberId();
    }

    /** 선생님 - 신청 거절 */
    @Transactional
    @Override
    public int applyReject(MemberApplyDto.Request req) throws NotFoundException {

        if(memberApplyRepository.findByGroup_GroupIdAndMember_MemberId(req.getGroupId(), req.getMemberId()).isEmpty())
            throw new NotFoundException("신청 정보가 없습니다.");

        // memberApply 테이블에서 해당 신청내역 지우기
        memberApplyRepository.deleteByGroup_GroupIdAndMember_MemberId(req.getGroupId(), req.getMemberId());

        return req.getMemberId();
    }
}
