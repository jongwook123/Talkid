package com.talkids.backend.dm.controller;

import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dm.dto.DmJoinMemberDto;
import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.service.DmRoomService;
import com.talkids.backend.dm.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/dm")
public class DmRoomController {

    private final DmRoomService dmRoomService;
    private final MessageService messageService;

    /** 회원별 채팅방 리스트 조회 */
    @GetMapping("/{memberId}")
    public ApiResult<?> getDmRoomList(@PathVariable int memberId){
        try{
            List<DmRoomDto.Response> result = dmRoomService.getDmRoomList(memberId);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 채팅방 입장/개설 */
    @PostMapping("/room")
    public ApiResult<?> getDmRoom(@Valid @RequestBody DmRoomDto.Request req) {
        try{
            List<?> result = dmRoomService.getDmRoom(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 메세지 전송 */
    @PostMapping("/message")
    public ApiResult<?> sendMessage(@Valid @RequestBody MessageDto.Request req) {
        try{
            String result = messageService.saveMessage(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /** 채팅방 퇴장/삭제 */
    @DeleteMapping("/room")
    public ApiResult<?> deleteDmRoom(@Valid @RequestBody DmJoinMemberDto.Request req) {
        try{
            String result = dmRoomService.deleteDmRoom(req);
            return ApiUtils.success(result);
        } catch(Exception e){
            return ApiUtils.error(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
