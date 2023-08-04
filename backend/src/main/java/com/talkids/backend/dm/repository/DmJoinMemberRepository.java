package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.DmJoinMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DmJoinMemberRepository extends JpaRepository<DmJoinMember, String> {

    List<DmJoinMember> findAll();

    List<?> findByDmRoom_DmRoomId(String dmRoomId);

    int deleteByMember_MemberMailAndDmRoom_DmRoomId(String memberMail, String dmRoomId);
}