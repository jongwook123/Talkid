package com.talkids.backend.notify.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.common.service.SocketService;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.service.GroupService;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.notify.dto.CreateNotifyDto;
import com.talkids.backend.notify.dto.NotifyDto;
import com.talkids.backend.notify.entity.NotifyContent;
import com.talkids.backend.notify.entity.NotifyReceiver;
import com.talkids.backend.notify.repository.NotifyContentRepository;
import com.talkids.backend.notify.repository.NotifyReceiverRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotifyServiceImpl implements NotifyService{
  
  private final NotifyContentRepository notifyContentRepository;
  private final NotifyReceiverRepository notifyReceiverRepository;
  private final SocketService socketService;
  private final GroupService groupService;
  
  @Override
  public void notifyGroup(Group group, CreateNotifyDto.Request body) {
    Member teacher = groupService.getGroupTeacher(group);
    notifyGroup(teacher, group, body);
  }
  
  @Override
  public void notifyGroup(Member sender, Group group, CreateNotifyDto.Request body) {
    NotifyContent notifyContent = NotifyContent.builder()
        .notifyHeader(body.getNotifyHeader()) //알림 제목
        .notifyBody(body.getNotifyBody())     //알림 내용
        .member(sender)                       //알림을 보낸사람
        .build();
    
    NotifyContent savedNotifyContent = notifyContentRepository.save(notifyContent);
    
    Map<String, Object> content = body.toMap(); //보내는 내용
    content.put("notifyContentId", savedNotifyContent.getNotifyContentId());  //알림의 id도 알려주자
    content.put("command", "newNotify");    //새로운 알람이 온 것이라고 표시
    content.put("checked", false);          //읽지 않은 알림이라고 표시
    
    socketService.groupSend(group, content,
    (m) -> {  //소켓으로 보내는 것이 성공 했을 때
      NotifyReceiver notifyReceiver = NotifyReceiver.builder()
                                      .notifyContent(savedNotifyContent)  //알림의 내용
                                      .member(m)                          //수신자
                                      .notifyReceiverChecked(false)         //읽은 내용이라고 넣기
                                          .build();
      notifyReceiverRepository.save(notifyReceiver);  //내용은 저장
    },
    (m) -> {  //소켓으로 보내는 것에 실패 했을 때
      NotifyReceiver notifyReceiver = NotifyReceiver.builder()
                                        .notifyContent(savedNotifyContent)  //알림의 내용
                                        .member(m)                          //수신자
                                        .notifyReceiverChecked(false)        //읽지 않은 내용으로 넣기
                                        .build();
      notifyReceiverRepository.save(notifyReceiver);  //내용은 저장
    });
    
  }
  
  @Override
  public void notifyMember(Member sender, Member receiver, CreateNotifyDto.Request body) {
    NotifyContent notifyContent = NotifyContent.builder()
        .notifyHeader(body.getNotifyHeader()) //알림 제목
        .notifyBody(body.getNotifyBody())     //알림 내용
        .member(sender)                       //알림을 보낸사람
        .build();
    
    NotifyContent savedNotifyContent = notifyContentRepository.save(notifyContent);
    
    Map<String, Object> content = body.toMap(); //보내는 내용
    content.put("notifyContentId", savedNotifyContent.getNotifyContentId());  //알림의 id도 알려주자
    content.put("command", "newNotify");    //새로운 알람이 온 것이라고 표시
    content.put("checked", false);          //읽지 않은 알림이라고 표시
    
    socketService.memberSend(receiver, content,
        (m) -> {  //소켓으로 보내는 것이 성공 했을 때
          NotifyReceiver notifyReceiver = NotifyReceiver.builder()
              .notifyContent(savedNotifyContent)  //알림의 내용
              .member(m)                          //수신자
              .notifyReceiverChecked(false)         //읽지 않은 내용으로 넣기
              .build();
          notifyReceiverRepository.save(notifyReceiver);  //내용은 저장
        },
        (m) -> {  //소켓으로 보내는 것에 실패 했을 때
          NotifyReceiver notifyReceiver = NotifyReceiver.builder()
              .notifyContent(savedNotifyContent)  //알림의 내용
              .member(m)                          //수신자
              .notifyReceiverChecked(false)        //읽지 않은 내용으로 넣기
              .build();
          notifyReceiverRepository.save(notifyReceiver);  //내용은 저장
        });
  }
  
  @Override
  public List<NotifyDto> getNotifyByMember(Member member) {
    List<NotifyReceiver> receivers = notifyReceiverRepository.findTop20ByMemberOrderByCreatedAtDesc(member);
    List<NotifyDto> dtos = new LinkedList<>();
    
    for(NotifyReceiver receive: receivers){
      NotifyDto dto = NotifyDto.fromEntity(receive.getNotifyContent(), receive);
      dtos.add(dto);
    }
    return dtos;
  }
  
  @Override
  @Transactional
  public void checkNotify(Member member, Integer notifyContentId) throws Exception{
    NotifyContent notifyContent = notifyContentRepository.findById(notifyContentId)
        .orElseThrow(() -> new NotFoundException("존재하지 않는 알림입니다"));
    NotifyReceiver notifyReceiver = notifyReceiverRepository.findByNotifyContentAndMember(notifyContent, member)
        .orElseThrow(() -> new NotFoundException("알림에 대해 읽을 권한이 없습니다"));
    
    if(notifyReceiver.getNotifyReceiverChecked()){
      //이미 읽은 거인 경우
      throw new Exception("이미 읽은 알림입니다");
    }
    
    notifyReceiver.setNotifyReceiverChecked(true);  //읽었다고 표시하기
  }
}