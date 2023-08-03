package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, String> {

    List<Message> findByDmRoom_DmRoomIdOrderByCreatedAtDesc(String dmRoomId);
    
}