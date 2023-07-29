package com.talkids.backend.controller;

import com.talkids.backend.dto.MessageDto;
import com.talkids.backend.entity.Message;
import com.talkids.backend.service.MessageService;
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
