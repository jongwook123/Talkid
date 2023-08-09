package com.talkids.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.talkids.backend.common.service.SocketService;
import com.talkids.backend.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;

@Component
@AllArgsConstructor
public class SocketHandler extends TextWebSocketHandler {

    private ObjectMapper mapper = new ObjectMapper();
    private final SocketService socketService;
    private final MemberRepository memberRepository;

    //메시지 받을 경우
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        Map<String, String> json = mapper.readValue(message.getPayload(), Map.class);
        socketService.memberSend(null, null, () -> {
            memberRepository.findAll();
        });
    }
    
    //웹 소켓에 첫 접속 시
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{

    }

    //웹 소켓 해제 시
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{

    }
}
