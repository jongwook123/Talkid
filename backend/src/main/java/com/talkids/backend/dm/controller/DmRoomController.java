package com.talkids.backend.dm.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dm.dto.DmJoinMemberDto;
import com.talkids.backend.dm.entity.DmJoinMember;
import com.talkids.backend.dm.service.DmRoomService;
import com.talkids.backend.dm.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

import static com.talkids.backend.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dm")
public class DmRoomController {

    private final MessageService messageService;
    private final SimpMessageSendingOperations template;
    private final DmRoomService dmRoomService;

    /** 회원별 채팅방 리스트 조회 */
    @GetMapping("/{memberId}")
    public ApiResult<List<DmJoinMember>> getDmRoomList(@PathVariable int memberId) throws Exception {
        List<DmJoinMember> dmRoomList = dmRoomService.getDmRoomList(memberId);
        Collections.reverse(dmRoomList); // 생성 최신순으로

        return success(dmRoomList);
    }

    /** 채팅방 개설 */
    @PostMapping("/room/{memberId}")
    public ApiResult<Integer> createDmRoom(@PathVariable int memberId) throws Exception {
        return success(dmRoomService.createDmRoom(memberId));
    }

    /** 채팅방 입장 */
    @GetMapping("/enter")
    public ApiResult<Integer> getDmRoom(@Valid @RequestBody DmJoinMemberDto.Request req) throws Exception {
        // 로그인 확인 -> db에 저장
        return success(dmRoomService.getDmRoom(req));
    }

    /** 채팅방 퇴장/삭제 */
    @DeleteMapping("/room")
    public ApiResult<Integer> deleteDmRoom(@Valid @RequestBody DmJoinMemberDto.Request req) throws Exception {
        return success(dmRoomService.deleteDmRoom(req));
    }

}
