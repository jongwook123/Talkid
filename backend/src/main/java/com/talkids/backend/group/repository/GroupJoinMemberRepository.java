package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.GroupJoinMember;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GroupJoinMemberRepository  extends JpaRepository<GroupJoinMember, String> {

    @Query("SELECT a FROM GroupJoinMember a WHERE a.group.groupId = :groupId and a.member.memberId = :memberId")
    Optional<GroupJoinMember> findByMember(@Param("groupId") int groupId, @Param("memberId") int memberId);

}
