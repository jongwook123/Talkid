package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.UncheckMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UncheckMessageRepository extends JpaRepository<UncheckMessage, String> {

    // 안읽은 메시지
    List<?> findByMember_MemberIdAndDmRoom_DmRoomId(int memberId, String dmRoomId);

}
