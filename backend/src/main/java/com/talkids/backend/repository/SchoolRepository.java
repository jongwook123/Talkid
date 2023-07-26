package com.talkids.backend.repository;

import com.talkids.backend.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolRepository extends JpaRepository<School, String> {

    School findBySchoolId(int schoolId);

}