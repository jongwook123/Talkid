package com.talkids.backend.group.controller;

import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.service.GroupService;
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
    @GetMapping("/{memberId}")
    public ApiResult<?> getGroupList(@PathVariable int memberId) {
        try{
            List<Group> result = groupService.getGroupList(memberId);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 그룹 개설 */
    @PostMapping
    public ApiResult<?> createGroup(@Valid @RequestBody GroupDto.Request req) {
        try{
            int result = groupService.createGroup(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 신청 내역 조회 */
    @GetMapping("/apply/{groupId}")
    public ApiResult<?> getApplyList(@PathVariable int groupId){
        try{
            List<?> result = groupService.getApplyList(groupId);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 신청 승인 */
    @PostMapping("/approve")
    public ApiResult<?> applyApproved(@Valid @RequestBody MemberApplyDto.Request req) {
        try{
            int result = groupService.applyApproved(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 선생님 - 신청 거절 */
    @PostMapping("/reject")
    public ApiResult<?> applyReject(@Valid @RequestBody MemberApplyDto.Request req){
        try{
            int result = groupService.applyReject(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 학생 - 그룹 신청 */
    @PostMapping("/apply")
    public ApiResult<?> joinGroup(@Valid @RequestBody MemberApplyDto.Request req){
        try{
            int result = groupService.joinGroup(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
