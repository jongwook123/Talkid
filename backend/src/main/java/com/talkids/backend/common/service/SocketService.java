package com.talkids.backend.common.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.entity.GroupJoinMember;
import com.talkids.backend.group.repository.GroupRepository;
import com.talkids.backend.group.service.GroupService;
import com.talkids.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import java.net.http.WebSocket;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SocketService {

    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<String, WebSocketSession> unknowns = Collections.synchronizedMap(new HashMap<>());
    private final Map<Integer, WebSocketSession> members = Collections.synchronizedMap(new HashMap<>());
    
    private final Map<String, Integer> sessionIdToMemberId = Collections.synchronizedMap(new HashMap<>());
    private final Map<Integer, String> memberIdToSessionId = Collections.synchronizedMap(new HashMap<>());

    //알수 없는 소켓 관리풀에다가 넣어주자
    public void addUnknownSession(WebSocketSession session){
        String sessionId = session.getId();
        unknowns.put(sessionId, session);
    }

    //소켓을 관리풀에서 지우자
    public void removeSession(WebSocketSession session){
        String sessionId = session.getId();
        Integer memberId = sessionIdToMemberId.get(sessionId);
        
        if(memberId != null){
            //멤버 인증이 된 소켓이면
            members.remove(memberId);   //멤버 세션 관리풀에서 삭제
            
            //연결관계도 삭제해주자
            sessionIdToMemberId.remove(sessionId);
            memberIdToSessionId.remove(memberId);
        }
        
        unknowns.remove(sessionId);
    }
    
    //멤버 관리풀에 넣어주자
    public void addMemberSession(Member member, WebSocketSession session){
        String sessionId = session.getId();
        Integer memberId = member.getMemberId();
        members.put(memberId, session);
        
        sessionIdToMemberId.put(sessionId, memberId);   //session id로부터 member id 변환 하는 것도 넣어주자
        memberIdToSessionId.put(memberId, sessionId);   //역방향도 넣어주자
    }
    //멤버로 소켓 보내기 요청 (해당 멤버가 소켓 연결이 되어있다고 확실할 때 사용)
    public void memberSend(Member member, Map<String, String> content, Success success){
        Integer memberId = member.getMemberId();
        WebSocketSession session = members.get(memberId);
        //연결이 되어 있으면
        try{
            //내용을 string으로 변경해서
            String jsonString = mapper.writeValueAsString(content);
            TextMessage message = new TextMessage(jsonString);
            session.sendMessage(message); //보내주자
            success.execute(member);
        } catch(Exception e){}
    }

    //멤버로 소켓 보내기 요청
    public void memberSend(Member member, Map<String, Object> content, Success success, Fail fail){
        Integer memberId = member.getMemberId();
        WebSocketSession session = members.get(memberId);
        if(session == null){
            //만약 연결이 안 되어 있으면
            fail.execute(member);   //실패 했을때에 대해서 실행
        }
        else{
            //연결이 되어 있으면
            try{
                //내용을 string으로 변경해서
                String jsonString = mapper.writeValueAsString(content);
                TextMessage message = new TextMessage(jsonString);
                session.sendMessage(message); //보내주자
                
                success.execute(member);    //성공 했을 때에 대해서 실행
            } catch(Exception e){}
        }
    }
    
    public void groupSend(Group group, Map<String, Object> content, Success success, Fail fail){
        List<GroupJoinMember> groupJoinMembers = group.getGroupJoinMember();    //해당 그룹에 속한 사람들을 가져와서
        
        for(GroupJoinMember groupJoinMember: groupJoinMembers){
            //그룹에 각 멤버들에게
            Member member = groupJoinMember.getMember();
            memberSend(member, content, success, fail); //알림을 보내자
        }
    }
    
    public interface Success{
        void execute(Member member);
    }
    
    public interface Fail{
        void execute(Member member);
    }
}
