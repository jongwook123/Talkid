package com.talkids.backend.dm.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.common.service.DetectLangsService;
import com.talkids.backend.dm.dto.MessageDto;
import com.talkids.backend.dm.dto.UncheckMessageDto;
import com.talkids.backend.dm.entity.BadWords;
import com.talkids.backend.dm.entity.DmRoom;
import com.talkids.backend.dm.entity.Message;
import com.talkids.backend.dm.repository.BadWordsRepository;
import com.talkids.backend.dm.repository.DmRoomRepository;
import com.talkids.backend.dm.repository.UncheckMessageRepository;
import com.talkids.backend.member.entity.Exp;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.repository.ExpRepository;
import com.talkids.backend.member.repository.MemberRepository;
import com.talkids.backend.dm.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MessageServiceImpl implements MessageService {

    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;
    private final DmRoomRepository dmRoomRepository;
    private final UncheckMessageRepository uncheckMessageRepository;
    private final BadWordsRepository badWordsRepository;
    private final ExpRepository expRepository;
    private final DetectLangsService detectLangsService;

    /** 메세지 저장 */
    @Transactional
    @Override
    public String saveMessage(MessageDto.Request req) throws Exception {

        String dmRoomId = req.getSender().compareTo(req.getReceiver()) > 0
                ? req.getReceiver()+"_"+req.getSender()
                : req.getSender()+"_"+req.getReceiver();

        Member sender = memberRepository.findByMemberMail(req.getSender()) // 발신자
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));
        Member receiver = memberRepository.findByMemberMail(req.getReceiver()) // 수신자
                .orElseThrow(()-> new NotFoundException("회원 정보가 없습니다."));
        DmRoom dmRoom =  dmRoomRepository.findByDmRoomId(dmRoomId)
                .orElseThrow(()->new NotFoundException("존재하는 방이 없습니다."));

        // 비속어 사용시 필터
        List<BadWords> badwordsList = badWordsRepository.findAll();

        for (BadWords badWord : badwordsList) {
            if (req.getMessageContent().contains(badWord.getWords())) {
                sender.setMemberFilterCount(sender.getMemberFilterCount() + 1);
                throw new Exception("비속어를 사용하였습니다.");
            }
        }
        
        // 언어 감지
        String detectLang = detectLangsService.DetectLangs(req.getMessageContent());

        // 알 수 없는 언어 X && 모국어와 다른 언어 사용했으면 => 경험치 증가
        if(detectLang!="unk" &&
                sender.getLanguage().getLanguageCode() != detectLang){

            Optional<Exp> exp = expRepository.findByMember_MemberId(sender.getMemberId());
            if(exp.isPresent()){ // 현재 사용자의 경험치가 있으면 갱신
                Exp senderExp = exp.get();
                senderExp.setExpPoint(
                        senderExp.getExpPoint() + req.getMessageContent().length()
                );
            } else { // 현재 사용자의 경험치가 없으면 DB insert
                expRepository.save(
                    Exp.builder()
                        .expPoint(req.getMessageContent().length())
                        .member(sender)
                        .build()
                );
            }
        }

        // 메세지 저장
        Message message = messageRepository.save(
                req.saveMessageDto(dmRoom, sender)
        );

        // 상대방 접속 X -> 안읽은 메세지로
        if(!req.isReadCheck()){
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
