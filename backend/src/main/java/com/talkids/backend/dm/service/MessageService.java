package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.entity.Message;

import java.util.List;

public interface MessageService {

    MessageDto.Response saveMessage(MessageDto.Request req);
    List<MessageDto.Response> getPreviousChatMessages(String dmRoomId);
}
