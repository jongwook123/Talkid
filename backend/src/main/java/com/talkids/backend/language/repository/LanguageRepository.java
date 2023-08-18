package com.talkids.backend.language.repository;

import com.talkids.backend.language.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LanguageRepository extends JpaRepository<Language, String> {

    Optional<Language> findByLanguageId(int languageId);
    List<Language> findAll();
}
