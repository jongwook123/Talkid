package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.dto.UncheckMessageDto;
import com.talkids.backend.dm.entity.Message;
import com.talkids.backend.dm.entity.UncheckMessage;
import com.talkids.backend.dm.repository.DmRoomRepository;
import com.talkids.backend.dm.repository.UncheckMessageRepository;
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
    private final UncheckMessageRepository uncheckMessageRepository;

    /** 메세지 저장 */
    public MessageDto.Response saveMessage(MessageDto.Request req) {

        String dmRoomId = req.getSender().compareTo(req.getReceiver()) > 0
                ? req.getReceiver()+"_"+req.getSender()
                : req.getSender()+"_"+req.getReceiver();

        Message message = messageRepository.save(req.saveMessageDto(
                dmRoomRepository.findByDmRoomId(dmRoomId).get(),
                memberRepository.findByMemberMail(req.getSender()).get() // 발신자
                ));

        MessageDto.Response ret = MessageDto.Response.messageResponseDto(
                message.getMember().getMemberMail(),
                message.getMessageContent(),
                message.getCreatedAt()
        );

        // 상대방 접속 X -> 안읽은 메세지로
        uncheckMessageRepository.save(
            UncheckMessageDto.Request.saveUncheckMessageDto(
                memberRepository.findByMemberMail(req.getReceiver()).get(), // 수신자
                message
            )
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
