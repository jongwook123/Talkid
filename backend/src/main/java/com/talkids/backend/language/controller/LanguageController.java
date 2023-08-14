package com.talkids.backend.language.controller;

import com.talkids.backend.common.annotation.LoginUser;
import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.language.dto.PartOfDictDto;
import com.talkids.backend.language.entity.Language;
import com.talkids.backend.language.service.LanguageService;
import com.talkids.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/language")
@RequiredArgsConstructor
public class LanguageController {

    private final LanguageService languageService;

    @GetMapping
    public ApiResult getLanguages(){
        List<Language> languages = languageService.getLanguages();
        return ApiUtils.success(languages);
    }

    @GetMapping("/{from}/{to}/{text}")
    public ApiResult getDictionary(@LoginUser Member member, @PathVariable String from, @PathVariable String to, @PathVariable String text){
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);

        List<PartOfDictDto> result = languageService.getDictionary(member, from, to, text);

        return ApiUtils.success(result);
    }
}
