package com.talkids.backend.notify.repository;

import com.talkids.backend.notify.entity.NotifyContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotifyContentRepository extends JpaRepository<NotifyContent, Integer> {
}
