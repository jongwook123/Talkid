package com.talkids.backend.group.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.entity.Group;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface GroupService {

    /** 선생님 - 그룹 리스트 조회 */
    List<Group> getGroupList(int memberId) throws NotFoundException;

    /** 선생님 - 그룹 개설 */
    int createGroup(GroupDto.Request req) throws NotFoundException;

    /** 선생님 - 신청 내역 조회 */
    List<?> getApplyList(int groupId) throws NotFoundException;

    /** 선생님 - 신청 승인 */
    int applyApproved(MemberApplyDto.Request req) throws NotFoundException;

    /** 선생님 - 신청 거절 */
    int applyReject(MemberApplyDto.Request req) throws NotFoundException;

    /** 학생 - 그룹 신청 */
    int joinGroup(MemberApplyDto.Request req) throws NotFoundException;

    /** 선생님 - 학생 관리 */
    List<?> studentManagement(@PathVariable int groupId) throws NotFoundException;

}
