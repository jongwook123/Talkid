package com.talkids.backend.group.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.group.dto.CreateGroupDto;
import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.dto.MemberApproveDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.member.entity.Member;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface GroupService {

    /** 선생님 - 그룹 리스트 조회 */
    List<Group> getGroupList(Member member) throws NotFoundException;

    /** 선생님 - 그룹 개설 */
    int createGroup(Member member, CreateGroupDto.Request req) throws NotFoundException;

    /** 선생님 - 그룹 삭제 */
    String deleteGroup(Member member, int groupId) throws NotFoundException;

    /** 선생님 - 신청 내역 조회 */
    List<?> getApplyList(int groupId) throws NotFoundException;

    /** 선생님 - 신청 승인 */
    int applyApproved(MemberApproveDto.Request req) throws NotFoundException;

    /** 선생님 - 신청 거절 */
    int applyReject(MemberApproveDto.Request req) throws NotFoundException;

    /** 학생 - 그룹 신청 */
    int joinGroup(Member member, MemberApplyDto.Request req) throws NotFoundException;

    /** 선생님 - 학생 관리 */
    List<?> studentManagement(Member member, int groupId) throws NotFoundException;

}
