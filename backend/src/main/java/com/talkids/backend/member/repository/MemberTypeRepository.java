package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.MemberType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberTypeRepository extends JpaRepository<MemberType, String> {

    Optional<MemberType> findByMemberTypeId(int memberTypeId);

}

