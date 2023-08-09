package com.talkids.backend.common.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.talkids.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import java.net.http.WebSocket;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SocketService {

    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<String, WebSocketSession> unknowns = Collections.synchronizedMap(new HashMap<>());
    private final Map<Integer, WebSocketSession> members = Collections.synchronizedMap(new HashMap<>());

    //알수 없는 소켓을 관리에다가 넣어주자
    public void addUnknownSession(WebSocketSession session){
        String id = session.getId();
        unknowns.put(id, session);
    }

    //알수 없는 소켓을 관리에서 지우자
    public void removeUnknownSession(WebSocketSession session){
        String id = session.getId();
        unknowns.remove(id);
    }
    
    //멤버 관리로 넣어주자
    public void addMemberSession(Member member, WebSocketSession session){
        Integer memberId = member.getMemberId();
        members.put(memberId, session);
        unknowns.remove(session.getId());
    }

    //멤버로 요청
    public void memberSend(Member member, Map<String, String> content, Fail fail){
        Integer memberId = member.getMemberId();
        WebSocketSession session = members.get(memberId);
        if(session == null){
            //만약 연결이 안 되어 있으면
            fail.execute();
        }
        else{
            //연결이 되어 있으면
            try{
                //내용을 string으로 변경해서
                String jsonString = mapper.writeValueAsString(content);
                TextMessage message = new TextMessage(jsonString);
                session.sendMessage(message); //보내주자
            } catch(Exception e){}
        }
    }

    public interface Fail{
        void execute();
    }
}
