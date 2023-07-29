package com.talkids.backend.service;

import com.talkids.backend.dto.MessageDto;
import com.talkids.backend.entity.Message;

public interface MessageService {

    Message saveMessage(MessageDto.Request req, int dmRoomId);

}
