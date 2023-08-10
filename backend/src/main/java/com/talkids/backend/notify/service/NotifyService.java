package com.talkids.backend.notify.service;

import com.talkids.backend.group.entity.Group;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.notify.dto.CreateNotifyDto;

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
   */
  void notifyMember(Member sender, Member receiver, CreateNotifyDto.Request body);
}
