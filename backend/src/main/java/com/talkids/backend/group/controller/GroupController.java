package com.talkids.backend.group.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.group.dto.CreateGroupDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.talkids.backend.common.utils.ApiUtils.success;

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
    public ApiResult<Integer> createGroup(@Valid @RequestBody CreateGroupDto.Request req) throws Exception {
        return success(groupService.createGroup(req));
    }

    /** 선생님 - 신청 내역 조회 */
    @GetMapping("/apply/{groupId}")
    public ApiResult<List<?>> getApplyList(@PathVariable int groupId) throws Exception {
        return success(groupService.getApplyList(groupId));
    }

    /** 선생님 - 신청 승인 */
    @PostMapping("/approve")
    public ApiResult<Integer> applyApproved(@Valid @RequestBody MemberApplyDto.Request req) throws Exception {
        return success(groupService.applyApproved(req));
    }

    /** 선생님 - 신청 거절 */
    @PostMapping("/reject")
    public ApiResult<Integer> applyReject(@Valid @RequestBody MemberApplyDto.Request req) throws Exception {
        return success(groupService.applyReject(req));
    }

    /** 학생 - 그룹 신청 */
    @PostMapping("/apply")
    public ApiResult<Integer> joinGroup(@Valid @RequestBody MemberApplyDto.Request req) throws Exception {
        return success(groupService.joinGroup(req));
    }

}
