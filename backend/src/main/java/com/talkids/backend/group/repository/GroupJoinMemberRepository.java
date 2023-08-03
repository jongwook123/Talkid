package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.GroupJoinMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupJoinMemberRepository  extends JpaRepository<GroupJoinMember, String> {

    Optional<GroupJoinMember> findByGroup_GroupIdAndMember_MemberId(int groupId, int memberId);

}
