package com.talkids.backend.service;

import com.talkids.backend.dto.DmRoomJoinDto;
import com.talkids.backend.dto.MessageDto;
import com.talkids.backend.entity.DmJoinMember;

import java.util.List;

public interface DmRoomService {

    /** 채팅방 리스트 조회 */
    List<DmJoinMember> getDmRoomList(int memberId) throws Exception;

    /** 채팅방 조회(입장) */
    int getDmRoom(DmRoomJoinDto.Request req) throws Exception;

    /** 채팅방 개설 */
    int createDmRoom(int memberId) throws Exception;

}
