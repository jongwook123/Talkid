package com.talkids.backend.group.controller;

import com.talkids.backend.common.annotation.LoginUser;
import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.group.dto.CreateGroupDto;
import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.dto.MemberApproveDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.service.GroupService;
import com.talkids.backend.member.entity.Member;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
public class GroupController {

    private final GroupService groupService;

    /** 선생님 - 회원별 그룹 리스트 조회 */
    @GetMapping
    public ApiResult<?> getGroupList(@LoginUser Member member) {
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);

        try{
            List<Group> result = groupService.getGroupList(member);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 그룹 개설 */
    @PostMapping
    public ApiResult<?> createGroup(@LoginUser Member member, @Valid @RequestBody CreateGroupDto.Request req) {
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
        if(member.getMemberType().getMemberTypeId() != 1) return ApiUtils.error("선생님만 그룹을 만들 수 있습니다", HttpStatus.BAD_REQUEST);

        try{
            int result = groupService.createGroup(member, req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    /** 선생님 - 그룹 삭제 */
    @DeleteMapping("/{groupId}")
    public ApiResult<?> deleteGroup(@LoginUser Member member, @PathVariable int groupId) {
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
        if(member.getMemberType().getMemberTypeId() != 1) return ApiUtils.error("선생님만 그룹을 삭제할 수 있습니다", HttpStatus.BAD_REQUEST);

        try{
            String result = groupService.deleteGroup(member, groupId);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 신청 내역 조회 */
    @GetMapping("/apply/{groupId}")
    public ApiResult<?> getApplyList(@LoginUser Member member, @PathVariable int groupId){
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
        if(member.getMemberType().getMemberTypeId() != 1) return ApiUtils.error("선생님만 조회할 수 있습니다", HttpStatus.BAD_REQUEST);

        try{
            List<?> result = groupService.getApplyList(groupId);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 신청 승인 */
    @PostMapping("/approve")
    public ApiResult<?> applyApproved(@LoginUser Member member, @Valid @RequestBody MemberApproveDto.Request req) {
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
        if(member.getMemberType().getMemberTypeId() != 1) return ApiUtils.error("선생님만 승인 할 수 있습니다", HttpStatus.BAD_REQUEST);

        try{
            int result = groupService.applyApproved(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 신청 거절 */
    @PostMapping("/reject")
    public ApiResult<?> applyReject(@LoginUser Member member, @Valid @RequestBody MemberApproveDto.Request req){
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
        if(member.getMemberType().getMemberTypeId() != 1) return ApiUtils.error("선생님만 거절 할 수 있습니다", HttpStatus.BAD_REQUEST);

        try{
            int result = groupService.applyReject(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 학생 관리 */
    @GetMapping("/management/{groupId}")
    public ApiResult<?> studentManagement(@LoginUser Member member, @PathVariable int groupId){
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
        if(member.getMemberType().getMemberTypeId() != 1) return ApiUtils.error("선생님만 학생을 관리 할 수 있습니다", HttpStatus.BAD_REQUEST);

        try{
            List<?> result = groupService.studentManagement(member, groupId);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /** 학생 - 그룹 신청 */
    @PostMapping("/apply")
    public ApiResult<?> joinGroup(@LoginUser Member member, @Valid @RequestBody MemberApplyDto.Request req){
        if(member == null) return ApiUtils.error("로그인 정보가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
        if(member.getMemberType().getMemberTypeId() != 2) return ApiUtils.error("학생만 신청 할 수 있습니다", HttpStatus.BAD_REQUEST);

        try{
            int result = groupService.joinGroup(member, req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
