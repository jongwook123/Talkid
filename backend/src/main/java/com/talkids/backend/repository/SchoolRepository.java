package com.talkids.backend.repository;

import com.talkids.backend.entity.Country;
import com.talkids.backend.entity.Language;
import com.talkids.backend.entity.Member;
import com.talkids.backend.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, String> {

    School findBySchoolName(String schoolName);

}