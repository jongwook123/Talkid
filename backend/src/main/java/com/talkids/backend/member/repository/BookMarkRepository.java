package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookMarkRepository extends JpaRepository<BookMark, String> {

    Optional<BookMark> findByBookMarkId(int bookMarkId);

    List<BookMark> findByMember_MemberId(int memberId);

    int deleteByBookMarkIdAndMember_MemberId(int bookMarkId, int memberId);
}
