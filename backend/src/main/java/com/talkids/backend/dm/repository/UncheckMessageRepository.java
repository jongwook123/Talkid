package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.UncheckMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UncheckMessageRepository extends JpaRepository<UncheckMessage, String> {

    void deleteByMember_MemberIdAndDmRoom_DmRoomId(int memberId, String dmRoomId);

}
