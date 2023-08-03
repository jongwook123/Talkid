package com.talkids.backend.dm.controller;

import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dm.dto.DmJoinMemberDto;
import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.entity.Message;
import com.talkids.backend.dm.service.DmRoomService;
import com.talkids.backend.dm.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.talkids.backend.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dm")
public class DmRoomController {

    private final DmRoomService dmRoomService;
    private final MessageService messageService;

    /** 회원별 채팅방 리스트 조회 */
    @GetMapping("/{memberId}")
    public ApiResult<List<DmRoomDto.Response>> getDmRoomList(@PathVariable int memberId) throws Exception {
        return success(dmRoomService.getDmRoomList(memberId));
    }

    /** 채팅방 입장/개설 */
    @PostMapping("/room")
    public ApiResult<List<?>> getDmRoom(@Valid @RequestBody DmRoomDto.Request req) throws Exception {
        return success(dmRoomService.getDmRoom(req));
    }

    /** 메세지 전송 */
    @PostMapping("/message")
    public ApiResult<Message> sendMessage(@Valid @RequestBody MessageDto.Request req) throws Exception {
        return success(messageService.saveMessage(req));
    }

    /** 채팅방 퇴장/삭제 */
    @DeleteMapping("/room")
    public ApiResult<String> deleteDmRoom(@Valid @RequestBody DmJoinMemberDto.Request req) throws Exception {
        return success(dmRoomService.deleteDmRoom(req));
    }

}
