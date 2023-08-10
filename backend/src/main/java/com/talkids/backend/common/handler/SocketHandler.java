package com.talkids.backend.common.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.talkids.backend.common.service.SocketService;
import com.talkids.backend.common.token.JwtTokenProvider;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.repository.MemberRepository;
import com.talkids.backend.member.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

import static com.talkids.backend.common.filter.JwtAuthenticationFilter.AUTHORIZATION_HEADER;

@Component
@AllArgsConstructor
public class SocketHandler extends TextWebSocketHandler {

    private ObjectMapper mapper = new ObjectMapper();
    private final SocketService socketService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    //메시지 받을 경우
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        Map<String, Object> json = mapper.readValue(message.getPayload(), Map.class);
        String command = (String)json.get("command");
        if(AUTHORIZATION_HEADER.equals(command)){
            //인증 과정인 경우
            String token = ((String)json.get(AUTHORIZATION_HEADER)).substring(7);
            boolean isValid = jwtTokenProvider.validateToken(token);
            if(isValid){
                //유효한 토큰이면 -> service로 요청하여 사용자 정보를 불러오자
                Authentication auth = jwtTokenProvider.getAuthentication(token);
                Member member = memberService.getMember(auth.getName());
                
                socketService.addMemberSession(member, session);    //해당 멤버가 해당 세션으로 연결되어있다고 표시
                socketService.sendInitNotify(member);                //읽지 않은 알람 등 초기에 보내줘야할거를 보내주자
            }
        }
    }
    
    //웹 소켓에 첫 접속 시
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        socketService.addUnknownSession(session);
    }

    //웹 소켓 해제 시
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        socketService.removeSession(session);
    }
}
