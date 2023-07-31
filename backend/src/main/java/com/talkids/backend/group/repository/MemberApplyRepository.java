package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.MemberApply;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberApplyRepository extends JpaRepository<MemberApply, String> {

    @Query("SELECT a.member FROM MemberApply a WHERE a.member.memberId = :memberId and a.group.groupId = :groupId")
    Optional<MemberApply> findByMember(@Param("memberId") int memberId, @Param("groupId") int groupId);

    @Query("SELECT a.member FROM MemberApply a WHERE a.group.groupId = :groupId")
    List<?> findByGroup(@Param("groupId") int groupId);

    @Modifying
    @Query("Delete FROM MemberApply a WHERE a.member.memberId = :memberId and a.group.groupId = :groupId")
    int deleteByMemberApplyId(@Param("memberId") int memberId, @Param("groupId") int groupId);
}
