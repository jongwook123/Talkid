package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, String> {

    List<Group> findAll();
    Optional<Group> findByGroupId(int groupId);
    List<Group> findByGroupJoinMember_Member_MemberIdOrderByCreatedAtDesc(int memberId);

}
