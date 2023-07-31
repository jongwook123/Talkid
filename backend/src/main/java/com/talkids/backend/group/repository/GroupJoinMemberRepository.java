package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.GroupJoinMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupJoinMemberRepository  extends JpaRepository<GroupJoinMember, String> {


}
