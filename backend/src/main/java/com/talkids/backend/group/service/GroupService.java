package com.talkids.backend.group.service;

import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.dto.GroupJoinMemberDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.entity.Group;

import java.util.List;

public interface GroupService {

    /** 선생님 - 그룹 리스트 조회 */
    List<Group> getGroupList(int memberId) throws Exception;

    /** 선생님 - 그룹 개설 */
    int createGroup(GroupDto.Request req) throws Exception;

    /** 학생 - 그룹 신청 */
    int joinGroup(MemberApplyDto.Request req) throws Exception;

}
