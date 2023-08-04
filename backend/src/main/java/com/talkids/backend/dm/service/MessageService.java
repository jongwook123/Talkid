package com.talkids.backend.dm.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.entity.Message;

import java.util.List;

public interface MessageService {

    String saveMessage(MessageDto.Request req) throws Exception;
    List<MessageDto.Response> getPreviousChatMessages(String dmRoomId) throws NotFoundException;
}
