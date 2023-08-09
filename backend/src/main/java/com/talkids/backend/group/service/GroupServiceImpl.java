package com.talkids.backend.group.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.dto.GroupJoinMemberDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.GroupJoinMember;
import com.talkids.backend.group.entity.MemberApply;
import com.talkids.backend.group.repository.MemberApplyRepository;
import com.talkids.backend.member.entity.Exp;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.group.repository.GroupJoinMemberRepository;
import com.talkids.backend.group.repository.GroupRepository;
import com.talkids.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
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
    public List<Group> getGroupList(Member member) throws NotFoundException{
        return groupRepository.findByGroupJoinMember_Member_MemberIdOrderByCreatedAtDesc(member.getMemberId());
    }

    /** 선생님 - 그룹 개설 */
    @Transactional
    @Override
    public int createGroup(Member member, GroupDto.Request req) throws NotFoundException {

        // groups 테이블에 저장
        Group group = groupRepository.save(req.saveGroupDto());

        // group_member_join 테이블에 저장
        groupJoinMemberRepository.save(
            GroupJoinMemberDto.Request.saveGroupJoinMemberDto(
                groupRepository.findByGroupId(group.getGroupId()).get(),
                    memberRepository.findByMemberId(req.getMemberId()).get()
            )
        );

        member.setMemberActive(true);

        return group.getGroupId();
    }

    /** 선생님 - 그룹 삭제 */
    @Transactional
    @Override
    public String deleteGroup(Member member, int groupId) throws NotFoundException {

        List<?> students = groupJoinMemberRepository.findByGroup_GroupId(groupId);

        for(int i=0; i<students.size(); i++){
            Member student = (Member) students.get(i);
            if(student.getMemberId()!=member.getMemberId() &&
                    groupJoinMemberRepository.findByMember_MemberId(student.getMemberId()).size() == 1){
                student.setMemberActive(false);
            }
        }

        groupRepository.deleteByGroupIdAndGroupJoinMember_Member_MemberId(groupId, member.getMemberId());

        return "Success";
    }

    /** 학생 - 그룹 신청 */
    @Transactional
    @Override
    public int joinGroup(Member member, MemberApplyDto.Request req) throws NotFoundException {
        
        Group group = groupRepository.findByGroupId(req.getGroupId())
                .orElseThrow(()-> new NotFoundException("그룹 정보가 없습니다."));

        if(memberApplyRepository
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

    /** 선생님 - 학생 관리 */
    @Override
    public List<?> studentManagement(Member member, int groupId) throws NotFoundException {
        if (groupRepository.findByGroupId(groupId).isEmpty())
            throw new NotFoundException("그룹 정보가 없습니다.");

        LocalDate currentDate = LocalDate.now();
        int year = currentDate.getYear();
        int month = currentDate.getMonthValue();

        Group group = groupRepository.findByGroupId(groupId).get();
        List<GroupJoinMemberDto.Response> joinMember = new ArrayList<>();

        // 학생 정보, 총 경험치, 월별 경험치 조회
        for (GroupJoinMember gm : group.getGroupJoinMember()) {
            Member student = gm.getMember();
            if(member.getMemberId() == student.getMemberId()) continue; // 선생님 제외
            
            int totalExp = 0;
            int monthExp = 0;

            // 학생의 경험치 정보 가져오기
            List<Exp> exps = student.getExp();
            for (Exp exp : exps) {
                LocalDate expDate = exp.getCreatedAt();
                if (expDate.getYear() == year && expDate.getMonthValue() == month) {
                    monthExp += exp.getExpPoint();
                }
                totalExp += exp.getExpPoint();
            }

            GroupJoinMemberDto.Response response = GroupJoinMemberDto.Response.groupJoinMemberDto(student, totalExp, monthExp);
            joinMember.add(response);
        }

        return joinMember;
    }
}
