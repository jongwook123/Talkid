package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.MemberApply;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberApplyRepository extends JpaRepository<MemberApply, String> {

    @Query("SELECT a.member FROM MemberApply a WHERE a.group.groupId = :groupId")
    List<?> findByGroup(@Param("groupId") int groupId);
}
