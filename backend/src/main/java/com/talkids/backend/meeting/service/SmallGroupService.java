package com.talkids.backend.meeting.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.meeting.dto.CreateSmallGroupDto;
import com.talkids.backend.meeting.entity.SmallGroup;
import com.talkids.backend.member.entity.Member;

import java.util.List;

public interface SmallGroupService {

    /** 소그룹 리스트 조회 */
    List<SmallGroup> getSmallGroupList(int meetingId) throws NotFoundException;

    /** 소그룹 생성 */
    int createSmallGroup(CreateSmallGroupDto.Request req) throws NotFoundException;

    /** 소그룹 삭제 */
    String deleteSmallGroup(int smallGroupId) throws NotFoundException;

    /** 소그룹 입장 */
    CreateSmallGroupDto.Response enterSmallGroup(Member member, int smallGroupId) throws NotFoundException;

    /** 소그룹 퇴장 */
    String exitSmallGroup(Member member) throws NotFoundException;

}
