package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.entity.Message;
import com.talkids.backend.dm.repository.DmRoomRepository;
import com.talkids.backend.member.repository.MemberRepository;
import com.talkids.backend.dm.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;
    private final DmRoomRepository dmRoomRepository;

    public Message saveMessage(MessageDto.Request req, int dmRoomId) {
        System.out.println("req : " + req  + ", dmRoomId: "+dmRoomId);

        System.out.println("dm방 찾기 : " + dmRoomRepository.findByDmRoomId(dmRoomId));

        Message message = messageRepository.save(req.saveMessageDto(
                dmRoomRepository.findByDmRoomId(dmRoomId),
                memberRepository.findByMemberId(req.getMemberId()).get()
                ));

        return message;
    }

}
