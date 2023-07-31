package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.GroupJoinMember;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GroupJoinMemberRepository  extends JpaRepository<GroupJoinMember, String> {

    @Query("SELECT a.member FROM GroupJoinMember a WHERE a.member.memberId = :memberId and a.group.groupId = :groupId")
    Optional<GroupJoinMember> findByMember(@Param("memberId") int memberId, @Param("groupId") int groupId);

}
