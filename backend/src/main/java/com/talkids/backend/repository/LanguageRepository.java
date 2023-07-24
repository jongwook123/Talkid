package com.talkids.backend.repository;

import com.talkids.backend.entity.Language;
import com.talkids.backend.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, String> {

    Language findByLanguageCode(String languageCode);

}
