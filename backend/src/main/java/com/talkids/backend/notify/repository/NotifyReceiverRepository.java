package com.talkids.backend.notify.repository;

import com.talkids.backend.notify.entity.NotifyReceiver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotifyReceiverRepository extends JpaRepository<NotifyReceiver, Integer> {
}
