package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.entity.Message;

import java.util.List;

public interface MessageService {

    Message saveMessage(MessageDto.Request req);
    List<Message> getPreviousChatMessages(String memberMail, String dmRoomId);
}
