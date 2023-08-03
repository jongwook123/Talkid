package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.MemberType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTypeRepository extends JpaRepository<MemberType, String> {

    MemberType findByMemberTypeId(int memberTypeId);

}

