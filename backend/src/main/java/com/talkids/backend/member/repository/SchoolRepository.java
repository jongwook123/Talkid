package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, String> {

    Optional<School> findBySchoolId(int schoolId);
    List<School> findAll();

}