package com.talkids.backend.service;

import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.dto.MemberSignUpDto;
import com.talkids.backend.entity.Country;
import com.talkids.backend.entity.Language;
import com.talkids.backend.entity.Member;
import com.talkids.backend.entity.School;
import com.talkids.backend.repository.CountryRepository;
import com.talkids.backend.repository.LanguageRepository;
import com.talkids.backend.repository.MemberRepository;
import com.talkids.backend.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final CountryRepository countryRepository;
    private final LanguageRepository languageRepository;
    private final SchoolRepository schoolRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public String teacherSignUp(MemberSignUpDto.Request saveTeacherDto) throws Exception {
        if (memberRepository.findByMemberMail(saveTeacherDto.getMemberMail()).isPresent()){
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        School school = schoolRepository.findBySchoolName(saveTeacherDto.getSchoolName());
        Language language = languageRepository.findByLanguageCode(saveTeacherDto.getLanguageCode());
        Country country = countryRepository.findByCountryName(saveTeacherDto.getCountryName());

        String encodePassword = passwordEncoder.encode(saveTeacherDto.getMemberPassword()); // 비밀번호 암호화
        Member member = memberRepository.save(saveTeacherDto.saveTeacherDto(encodePassword, school, language, country));

        System.out.println(member);
        return member.getMemberMail();
    }
}
