package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.DmRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DmRoomRepository extends JpaRepository<DmRoom, String> {

    List<DmRoom> findAll();
    DmRoom findByDmRoomId(int dmRoomId);

}
