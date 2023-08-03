package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.DmJoinMember;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DmJoinMemberRepository extends JpaRepository<DmJoinMember, String> {

    List<DmJoinMember> findAll();

    // 회원별 채팅방 리스트 뽑기
    @Query("SELECT j.dmRoom FROM DmJoinMember j WHERE j.member.memberId = :memberId")
    List<?> findByDmRoom(@Param("memberId") int memberId);

    List<?> findByDmRoom_DmRoomId(String dmRoomId);

    int deleteByMember_MemberIdAndDmRoom_DmRoomId(int memberId, String dmRoomId);
}