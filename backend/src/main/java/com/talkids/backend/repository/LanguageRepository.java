package com.talkids.backend.repository;

import com.talkids.backend.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, String> {

    Language findByLanguageId(int languageId);

}
