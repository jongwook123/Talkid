package com.talkids.backend.language.service;

import com.talkids.backend.language.dto.PartOfDictDto;
import com.talkids.backend.language.entity.Language;
import com.talkids.backend.member.entity.Member;

import java.util.List;

public interface LanguageService {

    List<Language> getLanguages();

    List<PartOfDictDto> getDictionary(Member member, String from, String to, String text);
}
