package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.DmJoinMemberDto;
import com.talkids.backend.dm.entity.DmJoinMember;

import java.util.List;

public interface DmRoomService {

    /** 채팅방 리스트 조회 */
    List<DmJoinMember> getDmRoomList(int memberId) throws Exception;

    /** 채팅방 조회(입장) */
    int getDmRoom(DmJoinMemberDto.Request req) throws Exception;

    /** 채팅방 개설 */
    int createDmRoom(int memberId) throws Exception;

    /** 채팅방 퇴장/삭제 */
    int deleteDmRoom(DmJoinMemberDto.Request req) throws Exception;
}
