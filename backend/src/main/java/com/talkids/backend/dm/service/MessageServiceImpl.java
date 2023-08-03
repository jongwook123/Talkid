package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.entity.Message;
import com.talkids.backend.dm.repository.DmRoomRepository;
import com.talkids.backend.member.repository.MemberRepository;
import com.talkids.backend.dm.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;
    private final DmRoomRepository dmRoomRepository;

    /** 메세지 저장 */
    public MessageDto.Response saveMessage(MessageDto.Request req) {

        Message message = messageRepository.save(req.saveMessageDto(
                dmRoomRepository.findByDmRoomId(req.getDmRoomId()).get(),
                memberRepository.findByMemberMail(req.getMemberMail()).get()
                ));

        MessageDto.Response ret = MessageDto.Response.messageResponseDto(
                message.getMember().getMemberMail(),
                message.getMessageContent(),
                message.getCreatedAt()
        );

        return ret;
    }

    /** 메세지 이전 기록 불러오기 */
    public List<MessageDto.Response> getPreviousChatMessages(String dmRoomId) {

        List<Message> messages = messageRepository.findByDmRoom_DmRoomIdOrderByCreatedAtDesc(dmRoomId);
        List<MessageDto.Response> message = new ArrayList<>();

        for (Message m : messages) {
            MessageDto.Response response = MessageDto.Response.messageResponseDto(
                    m.getMember().getMemberMail(),
                    m.getMessageContent(),
                    m.getCreatedAt()
            );
            message.add(response);
        }

        return message;
    }
}
