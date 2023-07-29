package com.talkids.backend.repository;

import com.talkids.backend.entity.DmRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DmRoomRepository extends JpaRepository<DmRoom, String> {

    List<DmRoom> findAll();
    DmRoom findByDmRoomId(int dmRoomId);

}
