package com.talkids.backend.service;

import com.talkids.backend.dto.SignInDto;
import com.talkids.backend.dto.SignUpDto;

public interface MemberService {

    /** 회원가입 */
    String SignUp(SignUpDto.Request req) throws Exception;

    /** 로그인 */
    String signIn(SignInDto.Request req) throws Exception;


}
