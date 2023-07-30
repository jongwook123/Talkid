package com.talkids.backend.service;

import com.talkids.backend.dto.GroupDto;
import com.talkids.backend.entity.Group;
import com.talkids.backend.entity.GroupJoinMember;

import java.util.List;

public interface GroupService {

    /** 선생님 - 그룹 리스트 조회 */
    List<Group> getGroupList(int memberId) throws Exception;


    /** 선생님 - 그룹 개설 */
    int createGroup(GroupDto.Request req) throws Exception;



}
