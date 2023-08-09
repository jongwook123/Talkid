package com.talkids.backend.dm.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.dm.dto.DmJoinMemberDto;
import com.talkids.backend.dm.dto.DmRoomDto;

import java.util.List;

public interface DmRoomService {

    /** 채팅방 리스트 조회 */
    List<DmRoomDto.Response> getDmRoomList(int memberId) throws NotFoundException;

    /** 입장/개설 */
    List<?> getDmRoom(DmRoomDto.Request req) throws NotFoundException;

    /** 채팅방 퇴장/삭제 */
    String deleteDmRoom(DmJoinMemberDto.Request req) throws NotFoundException;
}
