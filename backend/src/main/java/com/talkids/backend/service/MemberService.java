package com.talkids.backend.service;

import com.talkids.backend.dto.SignInDto;
import com.talkids.backend.dto.SignUpDto;
import com.talkids.backend.dto.UpdateInfoDto;
import com.talkids.backend.entity.Member;

import java.security.Principal;

public interface MemberService {

    /** 회원 정보 수정 */
    Member getMember(String memberMail);

    /** 회원가입 */
    String SignUp(SignUpDto.Request req) throws Exception;

    /** 로그인 */
    String signIn(SignInDto.Request req) throws Exception;

    /** 회원 정보 수정*/
    String UpdateInfoDto(int memberId, UpdateInfoDto.Request req, Principal principal) throws Exception;

}
