package com.talkids.backend.service;

import com.talkids.backend.dto.*;
import com.talkids.backend.entity.Member;

import java.security.Principal;

public interface MemberService {

    /** 회원 정보 수정 */
    Member getMember(String memberMail);

    /** 회원가입 */
    String signUp(SignUpDto.Request req) throws Exception;

    /** 로그인 */
    String signIn(SignInDto.Request req) throws Exception;

    /** 회원 정보 수정 */
    String updateInfoDto(int memberId, UpdateInfoDto.Request req, Principal principal) throws Exception;

    /** 로그아웃 */
    String logout(LogoutDto.Request req) throws Exception;

    /** 비밀번호 찾기 - 임시 비밀번호 발급 */
    String findPw(FindPwDto.Request req) throws Exception;

    /** 임시 비밀번호 생성 */
    String getTmpPassword() throws Exception;

}
