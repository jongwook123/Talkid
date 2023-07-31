package com.talkids.backend.repository;

import com.talkids.backend.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchoolRepository extends JpaRepository<School, String> {

    School findBySchoolId(int schoolId);
    List<School> findAll();

}