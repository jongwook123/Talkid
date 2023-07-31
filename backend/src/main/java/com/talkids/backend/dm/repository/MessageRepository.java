package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, String> {

}