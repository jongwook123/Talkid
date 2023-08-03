package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.DmRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DmRoomRepository extends JpaRepository<DmRoom, String> {

    List<DmRoom> findAll();
    DmRoom findByDmRoomId(String dmRoomId);

    @Query("SELECT r.dmRoomId, COUNT(um), MAX(m.messageContent) " +
            "FROM DmRoom r " +
            "LEFT JOIN Message m ON r = m.dmRoom " +
            "LEFT JOIN UncheckMessage um ON r = um.dmRoom AND um.member.memberId = :memberId " +
            "WHERE r.dmRoomId IN (SELECT DISTINCT jr.dmRoom.dmRoomId FROM DmJoinMember jr WHERE jr.member.memberId = :memberId) " +
            "GROUP BY r.dmRoomId " +
            "ORDER BY MAX(m.createdAt) DESC NULLS LAST")
    List<Object[]> getChatRoomsAndUncheckCounts(@Param("memberId") int memberId);
}
