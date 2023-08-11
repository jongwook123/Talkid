package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.Exp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpRepository extends JpaRepository<Exp, String> {

    List<Exp> findByMember_MemberId(int memberId);

}
