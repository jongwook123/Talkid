package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.MemberApply;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberApplyRepository extends JpaRepository<MemberApply, String> {

    Optional<MemberApply> findByGroup_GroupIdAndMember_MemberId(int groupId, int memberId);

    @Query("SELECT a.member FROM MemberApply a WHERE a.group.groupId = :groupId order by a.createdAt DESC ")
    List<?> findByGroup(@Param("groupId") int groupId);

    int deleteByGroup_GroupIdAndMember_MemberId(int groupId, int memberId);
}
