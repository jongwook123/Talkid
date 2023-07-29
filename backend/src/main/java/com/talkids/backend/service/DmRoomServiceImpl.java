package com.talkids.backend.service;

import com.talkids.backend.dto.DmRoomDto;
import com.talkids.backend.dto.DmRoomJoinDto;
import com.talkids.backend.entity.DmJoinMember;
import com.talkids.backend.entity.DmRoom;
import com.talkids.backend.repository.DmJoinMemberRepository;
import com.talkids.backend.repository.DmRoomRepository;
import com.talkids.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DmRoomServiceImpl implements DmRoomService {

    private final MemberRepository memberRepository;
    private final DmRoomRepository dmRoomRepository;
    private final DmJoinMemberRepository dmJoinMemberRepository;

    private final SimpMessagingTemplate messagingTemplate;

    /** 회원별 채팅방 리스트 조회 */
    @Override
    public List<DmJoinMember> getDmRoomList(int memberId) {
        return dmJoinMemberRepository.findAll()
                .stream().filter(x->x.getMember().getMemberId()==memberId).findAny()
                .stream().toList();
    }

    /** 채팅방 입장 */
    @Transactional
    @Override
    public int getDmRoom(DmRoomJoinDto.Request req) {

        DmRoom dmRoom = dmRoomRepository.findByDmRoomId(req.getDmRoomId());

        messagingTemplate.convertAndSend(
                "/sub/dm/room/" + req.getDmRoomId(),
                memberRepository.findByMemberId(req.getMemberId()).get()
                        .getMemberName() + "님이 채팅방에 참여하셨습니다.");

        // DB에 없으면 insert
        if (dmJoinMemberRepository.findByDmJoinMemberId(req.getMemberId(), req.getDmRoomId()).isEmpty()) {
            dmJoinMemberRepository.save(
                    DmRoomJoinDto.Request.saveDmRoomJoinDto(
                            dmRoom,
                            memberRepository.findByMemberId(req.getMemberId()).get()));
        }
        return dmRoom.getDmRoomId();
    }

    /** 채팅방 개설 */
    @Transactional
    @Override
    public int createDmRoom(int memberId) throws Exception {
        DmRoom dmRoom = DmRoomDto.Request.saveDmRoomDto();
        dmRoomRepository.save(dmRoom);

        // DmJoinMember 테이블 insert
        dmJoinMemberRepository.save(
                DmRoomJoinDto.Request.saveDmRoomJoinDto(
                        dmRoom,
                        memberRepository.findByMemberId(memberId).get()));

        return dmRoom.getDmRoomId();
    }

    /** 채팅방 퇴장 */


}
