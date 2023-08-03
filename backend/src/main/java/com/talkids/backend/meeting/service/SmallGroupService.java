package com.talkids.backend.meeting.service;

import com.talkids.backend.meeting.dto.SmallGroupDto;
import com.talkids.backend.meeting.entity.SmallGroup;

import java.util.List;

public interface SmallGroupService {

    /** 소그룹 리스트 조회 */
    List<SmallGroup> getSmallGroupList(int meetingId) throws Exception;

    /** 소그룹 생성 */
    int createSmallGroup(SmallGroupDto.Request req) throws Exception;

    /** 소그룹 삭제 */
    int deleteSmallGroup(int smallGroupId) throws Exception;
}
