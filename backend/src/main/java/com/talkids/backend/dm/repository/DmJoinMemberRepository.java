package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.DmJoinMember;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DmJoinMemberRepository extends JpaRepository<DmJoinMember, String> {

    List<DmJoinMember> findAll();

    @Query("SELECT j.dmRoom FROM DmJoinMember j WHERE j.member.memberId = :memberId order by j.dmRoom.updatedAt")
    List<?> findByMember(@Param("memberId") int memberId);

    List<?> findByMember_MemberIdAndDmRoom_DmRoomId(int memberId, int dmRoomId);

    int deleteByMember_MemberIdAndDmRoom_DmRoomId(int memberId, int dmRoomId);
}