package com.talkids.backend.notify.repository;

import com.talkids.backend.member.entity.Member;
import com.talkids.backend.notify.entity.NotifyContent;
import com.talkids.backend.notify.entity.NotifyReceiver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotifyReceiverRepository extends JpaRepository<NotifyReceiver, Integer> {
  List<NotifyReceiver> findTop20ByMemberOrderByCreatedAtDesc(Member member);
  Optional<NotifyReceiver> findByNotifyContentAndMember(NotifyContent notifyContent, Member member);
}
