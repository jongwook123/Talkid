package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.entity.Message;

public interface MessageService {

    Message saveMessage(MessageDto.Request req, int dmRoomId);

}
