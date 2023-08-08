package com.talkids.backend.meeting.repository;

import com.talkids.backend.meeting.entity.SmallGroupMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SmallGroupMemberRepository extends JpaRepository<SmallGroupMember, String> {

    Optional<SmallGroupMember> findByMember_MemberId(int memberId);

}
