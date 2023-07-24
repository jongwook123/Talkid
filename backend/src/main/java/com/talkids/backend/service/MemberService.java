package com.talkids.backend.service;

import com.talkids.backend.dto.SignInDto;
import com.talkids.backend.dto.TeacherSignUpDto;

public interface MemberService {

    /** 선생님 회원가입 */
    String teacherSignUp(TeacherSignUpDto.Request req) throws Exception;

    /** 로그인 */
    String signIn(SignInDto.Request req) throws Exception;


}
