package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.DmJoinMember;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DmJoinMemberRepository extends JpaRepository<DmJoinMember, String> {

    List<DmJoinMember> findAll();

    @Query("SELECT j FROM DmJoinMember j WHERE j.member.memberId = :memberId")
    List<DmJoinMember> findByMember(@Param("memberId") int memberId);

    @Query("SELECT j FROM DmJoinMember j WHERE j.dmRoom.dmRoomId = :dmRoomId")
    List<?> findByDmRoom(@Param("dmRoomId") int dmRoomId);

    @Query("SELECT j FROM DmJoinMember j WHERE j.member.memberId = :memberId and j.dmRoom.dmRoomId = :dmRoomId")
    List<?> findByDmJoinMemberId(@Param("memberId") int memberId , @Param("dmRoomId") int dmRoomId);

    @Modifying
    @Query("Delete FROM DmJoinMember j WHERE j.member.memberId = :memberId and j.dmRoom.dmRoomId = :dmRoomId")
    int deleteByDmJoinMemberId(@Param("memberId") int memberId , @Param("dmRoomId") int dmRoomId);
}