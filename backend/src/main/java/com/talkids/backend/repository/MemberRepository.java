package com.talkids.backend.repository;

import com.talkids.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {

    Optional<Member> findByMemberId(int memberId);
    Optional<Member> findByMemberMail(String memberMail);

}
