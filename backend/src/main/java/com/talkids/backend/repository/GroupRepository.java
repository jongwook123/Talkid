package com.talkids.backend.repository;

import com.talkids.backend.entity.Group;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, String> {

    List<Group> findAll();
    Group findByGroupId(int groupId);

    @Query("SELECT g FROM Group g JOIN GroupJoinMember gjm ON g.groupId = gjm.group.groupId WHERE gjm.member.memberId = :memberId")
    List<Group> findByGroup(@Param("memberId") int memberId);


}
