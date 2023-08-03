package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.entity.Message;
import com.talkids.backend.dm.repository.DmRoomRepository;
import com.talkids.backend.member.repository.MemberRepository;
import com.talkids.backend.dm.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;
    private final DmRoomRepository dmRoomRepository;

    /** 메세지 저장 */
    public Message saveMessage(MessageDto.Request req) {

        Message message = messageRepository.save(req.saveMessageDto(
                dmRoomRepository.findByDmRoomId(req.getDmRoomId()),
                memberRepository.findByMemberMail(req.getMemberMail()).get()
                ));

        return message;
    }

    /** 메세지 이전 기록 불러오기 */
    public List<Message> getPreviousChatMessages(String memberMail, String dmRoomId) {
        return messageRepository.findByMember_MemberMailAndDmRoom_DmRoomIdOrderByCreatedAtDesc(memberMail, dmRoomId);
    }
}
