package com.talkids.backend.repository;

import com.talkids.backend.entity.MemberType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTypeRepository extends JpaRepository<MemberType, String> {

    MemberType findByMemberTypeId(int memberTypeId);

}

