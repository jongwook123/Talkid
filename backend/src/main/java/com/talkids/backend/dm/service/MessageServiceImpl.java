package com.talkids.backend.dm.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.common.utils.ApiUtils;
import com.talkids.backend.common.utils.ApiUtils.ApiResult;
import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.dto.UncheckMessageDto;
import com.talkids.backend.dm.entity.DmRoom;
import com.talkids.backend.dm.entity.Message;
import com.talkids.backend.dm.entity.UncheckMessage;
import com.talkids.backend.dm.repository.DmRoomRepository;
import com.talkids.backend.dm.repository.UncheckMessageRepository;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.repository.MemberRepository;
import com.talkids.backend.dm.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public String saveMessage(MessageDto.Request req) throws NotFoundException {

        String dmRoomId = req.getSender().compareTo(req.getReceiver()) > 0
                ? req.getReceiver()+"_"+req.getSender()
                : req.getSender()+"_"+req.getReceiver();

        Member sender = memberRepository.findByMemberMail(req.getSender()) // 발신자
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));
        Member receiver = memberRepository.findByMemberMail(req.getReceiver()) // 수신자
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));
        DmRoom dmRoom =  dmRoomRepository.findByDmRoomId(dmRoomId)
                .orElseThrow(()->new NotFoundException("존재하는 방이 없습니다."));

        Message message = messageRepository.save(
                req.saveMessageDto(dmRoom, sender)
        );

        if(!req.isReadCheck()){
            // 상대방 접속 X -> 안읽은 메세지로
            uncheckMessageRepository.save(
                UncheckMessageDto.Request.saveUncheckMessageDto(receiver, message)
            );
        }

        return "Success";
    }

    /** 메세지 이전 기록 불러오기 */
    public List<MessageDto.Response> getPreviousChatMessages(String dmRoomId) throws NotFoundException {
        if(dmRoomRepository.findByDmRoomId(dmRoomId).isEmpty())
            throw new NotFoundException("존재하는 방이 없습니다.");

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
