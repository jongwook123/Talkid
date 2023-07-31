package com.talkids.backend.dm.controller;

import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class DmStompController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    @MessageMapping(value = "/dm/{dmRoomId}")
    public void message(@DestinationVariable("dmRoomId") int dmRoomId, MessageDto.Request message) {
        System.out.println(message);
        messageService.saveMessage(message, dmRoomId);
        
        messagingTemplate.convertAndSend("/sub/dm/room/"+dmRoomId, message);
    }

}
