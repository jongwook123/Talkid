package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LanguageRepository extends JpaRepository<Language, String> {

    Optional<Language> findByLanguageId(int languageId);
    List<Language> findAll();
}
