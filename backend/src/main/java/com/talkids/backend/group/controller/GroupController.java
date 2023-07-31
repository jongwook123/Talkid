package com.talkids.backend.group.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.group.dto.GroupJoinMemberDto;
import com.talkids.backend.group.dto.MemberApplyDto;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.MemberApply;
import com.talkids.backend.group.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

import static com.talkids.backend.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
public class GroupController {

    private final GroupService groupService;

    /** 선생님 - 회원별 그룹 리스트 조회 */
    @GetMapping("/{memberId}")
    public ApiResult<List<Group>> getGroupList(@PathVariable int memberId) throws Exception {
        List<Group> groupList = groupService.getGroupList(memberId);
        Collections.reverse(groupList); // 생성 최신순으로

        return success(groupList);
    }

    /** 선생님 - 그룹 개설 */
    @PostMapping
    public ApiResult<Integer> createGroup(@Valid @RequestBody GroupDto.Request req) throws Exception {
        return success(groupService.createGroup(req));
    }

    /** 선생님 - 신청 내역 조회 */
    @GetMapping("/apply/{groupId}")
    public ApiResult<List<?>> getApplyList(@PathVariable int groupId) throws Exception {
        List<?> applyList = groupService.getApplyList(groupId);
        Collections.reverse(applyList); // 신청 최신순으로

        return success(applyList);
    }

    /** 선생님 - 신청 승인 */
    @PostMapping("/approve")
    public ApiResult<Integer> applyApproved(@Valid @RequestBody MemberApplyDto.Request req) throws Exception {
        return success(groupService.applyApproved(req));
    }

    /** 학생 - 그룹 신청 */
    @PostMapping("/apply")
    public ApiResult<Integer> joinGroup(@Valid @RequestBody MemberApplyDto.Request req) throws Exception {
        return success(groupService.joinGroup(req));
    }

}
