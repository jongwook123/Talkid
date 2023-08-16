package com.talkids.backend.notify.service;

import com.talkids.backend.common.service.SocketService;
import com.talkids.backend.common.service.SocketService.Success;
import com.talkids.backend.common.service.SocketService.Fail;
import com.talkids.backend.group.entity.Group;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.notify.dto.CreateNotifyDto;
import com.talkids.backend.notify.dto.NotifyDto;
import com.talkids.backend.notify.entity.NotifyContent;

import java.util.List;

public interface NotifyService {
  
  /**
   * Group에게 알림을 보냅니다(보내는 사람을 Group의 장인 선생님으로 보냅니다)
   * @param group 보내고자 하는 그룹
   * @param body 보내고자 하는 내용
   */
  void notifyGroup(Group group, CreateNotifyDto.Request body);
  
  /**
   * Group에게 알림을 보냅니다
   * @param member 해당 알림을 보내는 사람
   * @param group 보내고자 하는 그룹
   * @param body 보내고자 하는 내용
   */
  void notifyGroup(Member member, Group group, CreateNotifyDto.Request body);

   /**
   * Member에게 알림을 보냅니다
   * @param sender 해당 알림을 보내는 사람
   * @param receiver 받는 사람
   * @param body 보내고자 하는 내용
   * @return 저장된 NotifyContent 객체
   */
  NotifyContent notifyMember(Member sender, Member receiver, CreateNotifyDto.Request body);

  /**
   * Member에게 알림을 보냅니다
   * @param sender 해당 알림을 보내는 사람
   * @param receiver 받는 사람
   * @param body 보내고자 하는 내용
   * @param success 성공시 수행할 일
   * @param fail 실패 시 수행할 일
   * @return 저장된 NotifyContent 객체
   */
  NotifyContent notifyMember(Member sender, Member receiver, CreateNotifyDto.Request body, Success success, Fail fail);


  /**
   * Member에게 받을 알림을 가져옵니다
   * @param member 해당 알림을 받은 사람
   * @return 알림들
   */
  List<NotifyDto> getNotifyByMember(Member member);
  
  /**
   * Member가 해당 알람을 읽었다고 처리
   * @param member 알람을 읽은 멤버
   * @param notifyContentId 어떤 알람인지
   */
  void checkNotify(Member member, Integer notifyContentId) throws Exception;

  void notifyStartMeetings(Long minute);
}
