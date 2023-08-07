package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.GroupJoinMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GroupJoinMemberRepository  extends JpaRepository<GroupJoinMember, String> {

    Optional<GroupJoinMember> findByGroup_GroupIdAndMember_MemberId(int groupId, int memberId);

    @Query("Select g.member From GroupJoinMember g Where g.group.groupId = :groupId")
    List<?> findByGroup_GroupId(int groupId);
}
