package com.talkids.backend.notify.service;

import com.talkids.backend.common.service.SocketService;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.group.service.GroupService;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.notify.dto.CreateNotifyDto;
import com.talkids.backend.notify.entity.NotifyContent;
import com.talkids.backend.notify.entity.NotifyReceiver;
import com.talkids.backend.notify.repository.NotifyContentRepository;
import com.talkids.backend.notify.repository.NotifyReceiverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    
    socketService.groupSend(group, content,
    (m) -> {  //소켓으로 보내는 것이 성공 했을 때
      NotifyReceiver notifyReceiver = NotifyReceiver.builder()
                                      .notifyContent(savedNotifyContent)  //알림의 내용
                                      .member(m)                          //수신자
                                      .notifyReceiverStatus(true)         //읽은 내용이라고 넣기
                                          .build();
      notifyReceiverRepository.save(notifyReceiver);  //내용은 저장
    },
    (m) -> {  //소켓으로 보내는 것에 실패 했을 때
      NotifyReceiver notifyReceiver = NotifyReceiver.builder()
                                        .notifyContent(savedNotifyContent)  //알림의 내용
                                        .member(m)                          //수신자
                                        .notifyReceiverStatus(false)        //읽지 않은 내용으로 넣기
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
    
    socketService.memberSend(receiver, content,
        (m) -> {  //소켓으로 보내는 것이 성공 했을 때
          NotifyReceiver notifyReceiver = NotifyReceiver.builder()
              .notifyContent(savedNotifyContent)  //알림의 내용
              .member(m)                          //수신자
              .notifyReceiverStatus(true)         //읽은 내용이라고 넣기
              .build();
          notifyReceiverRepository.save(notifyReceiver);  //내용은 저장
        },
        (m) -> {  //소켓으로 보내는 것에 실패 했을 때
          NotifyReceiver notifyReceiver = NotifyReceiver.builder()
              .notifyContent(savedNotifyContent)  //알림의 내용
              .member(m)                          //수신자
              .notifyReceiverStatus(false)        //읽지 않은 내용으로 넣기
              .build();
          notifyReceiverRepository.save(notifyReceiver);  //내용은 저장
        });
  }
}