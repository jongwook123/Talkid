package com.talkids.backend.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dto.DmRoomDto;
import com.talkids.backend.dto.DmRoomJoinDto;
import com.talkids.backend.entity.DmJoinMember;
import com.talkids.backend.service.DmRoomService;
import com.talkids.backend.service.MessageService;
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
    @GetMapping("{memberId}")
    public ApiResult<List<DmJoinMember>> getDMRoomList(@PathVariable int memberId) throws Exception {
        List<DmJoinMember> dmRoomList = dmRoomService.getDmRoomList(memberId);
        Collections.reverse(dmRoomList); // 생성 최신순으로

        return success(dmRoomList);
    }

    /** 채팅방 입장 */
    @GetMapping("/enter")
    public ApiResult<Integer> getDMRoom(@Valid @RequestBody DmRoomJoinDto.Request req) throws Exception {
        // 로그인 확인 -> db에 저장
        return success(dmRoomService.getDmRoom(req));
    }
    
    /** 채팅방 개설 */
    @PostMapping("/room/{memberId}")
    public ApiResult<Integer> createDMRoom(@PathVariable int memberId) throws Exception {
        return success(dmRoomService.createDmRoom(memberId));
    }

}
