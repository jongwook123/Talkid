package com.talkids.backend.meeting.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.meeting.dto.SmallGroupDto;
import com.talkids.backend.meeting.entity.SmallGroup;
import com.talkids.backend.meeting.service.SmallGroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.talkids.backend.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/smallGroup")
public class MeetingController {

    private final SmallGroupService smallGroupService;

    /** 소그룹 리스트 조회 */
    @GetMapping("/{meetingId}")
    public ApiResult<List<SmallGroup>> getSmallGroupList(@PathVariable int meetingId) throws Exception {
        return success(smallGroupService.getSmallGroupList(meetingId));
    }

    /** 소그룹 생성 */
    @PostMapping
    public ApiResult<Integer> createSmallGroup(@Valid @RequestBody SmallGroupDto.Request req) throws Exception {
        return success(smallGroupService.createSmallGroup(req));
    }

    /** 소그룹 삭제 */
    @DeleteMapping("/{smallGroupId}")
    public ApiResult<Integer> deleteSmallGroup(@PathVariable int smallGroupId) throws Exception {
        return success(smallGroupService.deleteSmallGroup(smallGroupId));
    }

}
