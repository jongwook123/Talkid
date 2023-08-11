package com.talkids.backend.member.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.member.entity.BookMark;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.dto.*;

import java.util.List;
import java.util.Map;

public interface MemberService {

    /** 로그인 조회 */
    Member getMember(String memberMail);

    /** 회원가입 */
    Member signUp(SignUpDto.Request req) throws NotFoundException;

    /** 회원가입 - 국가, 학교, 언어 리스트 */
    List<?> getSignUpInfo(String info) throws NotFoundException;

    /** 로그인 */
    Map<String, String> signIn(SignInDto.Request req) throws NotFoundException;

    /** 회원 정보 수정 */
    String updateInfoDto(Member member, UpdateInfoDto.Request req) throws NotFoundException;

    /** 로그아웃 */
    String logout(LogoutDto.Request req) throws NotFoundException;

    /** 회원 탈퇴 */
    String deleteInfoDto(Member member) throws NotFoundException;

    /** 비밀번호 찾기 - 임시 비밀번호 발급 */
    String findPw(FindPwDto.Request req) throws Exception;

    /** 임시 비밀번호 생성 **/
    String getTmpPassword() throws NotFoundException;

    /* ------------------------------------------------------*/

    /** 사용자 찾기 및 필터링 */
    List<?> findMember(String searchBy, String keyword) throws NotFoundException;

    /* ------------------------------------------------------*/

    /** 북마크 조회 */
    List<BookMark> getBookMark(Member member) throws NotFoundException;

    /** 북마크 등록 */
    AddBookMarkDto.Response addBookMark(Member member, AddBookMarkDto.Request req) throws NotFoundException;

    /** 북마크 삭제 */
    String deleteBookMark(Member member, int bookMarkId) throws NotFoundException;

    /** 팔로우, 언팔로우 */
    FollowerDto.Response addFollower(Member member, int  memberId) throws NotFoundException;

    Map<String, ?> cntFollower(int memberId, String info) throws NotFoundException;

    int getExp(int memberId) throws NotFoundException;
}
