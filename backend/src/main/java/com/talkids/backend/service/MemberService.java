package com.talkids.backend.service;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dto.MemberSignUpDto;

public interface MemberService {

    /** 선생님 회원가입 */
    String teacherSignUp(MemberSignUpDto.Request saveTeacherDto) throws Exception;

}
