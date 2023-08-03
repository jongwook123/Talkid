package com.talkids.backend.dm.service;

import com.talkids.backend.dm.dto.DmRoomDto;
import com.talkids.backend.dm.dto.DmJoinMemberDto;
import com.talkids.backend.dm.entity.DmRoom;
import com.talkids.backend.dm.repository.DmJoinMemberRepository;
import com.talkids.backend.dm.repository.DmRoomRepository;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DmRoomServiceImpl implements DmRoomService {

    private final MemberRepository memberRepository;
    private final DmRoomRepository dmRoomRepository;
    private final DmJoinMemberRepository dmJoinMemberRepository;
    private final MessageService messageService;

    /** 회원별 채팅방 리스트 조회 */
    @Override
    public List<DmRoomDto.Response> getDmRoomList(int memberId) {
        List<Object[]> results = dmRoomRepository.getChatRoomsAndUncheckCounts(memberId);
        List<DmRoomDto.Response> chatRooms = new ArrayList<>();

        for (Object[] result : results) {
            String dmRoomId = result[0].toString();
            int uncheckMessage = ((Long) result[1]).intValue();
            String lastMessage = (String) result[2];

            DmRoomDto.Response response = DmRoomDto.Response.messageResponseDto(dmRoomId, uncheckMessage, lastMessage);
            chatRooms.add(response);
        }

//        dmJoinMemberRepository.findByDmRoom(memberId);


        return chatRooms;
    }

    /** 채팅방 입장/개설 */
    @Transactional
    @Override
    public List<?> getDmRoom(DmRoomDto.Request req) throws Exception {

        DmRoom dmRoom = DmRoomDto.Request.saveDmRoomDto(req.getSender(), req.getReceiver());

        // 2.1 기존에 채팅방이 없는 경우 DM방 생성 및 DmJoinMember에 회원 정보 추가
        if (dmRoomRepository.findByDmRoomId(req.getSender()+"_"+req.getReceiver()).isEmpty()) {

            // dm 방 생성
            dmRoomRepository.save(dmRoom);

            // DmJoinMember 테이블에 회원 정보 insert
            dmJoinMemberRepository.save(
                DmJoinMemberDto.Request.saveDmJoinMemberDto(
                    dmRoom,
                    memberRepository.findByMemberMail(req.getSender()).get()));

            dmJoinMemberRepository.save(
                DmJoinMemberDto.Request.saveDmJoinMemberDto(
                    dmRoom,
                    memberRepository.findByMemberMail(req.getReceiver()).get()));

        }

        return messageService.getPreviousChatMessages(req.getSender()+"_"+req.getReceiver());
    }

    /** 채팅방 퇴장/삭제 */
    @Transactional
    @Override
    public String deleteDmRoom(DmJoinMemberDto.Request req) throws Exception {

        DmRoom dmRoom = dmRoomRepository.findByDmRoomId(req.getDmRoomId()).get();
        Member member = memberRepository.findByMemberId(req.getMemberId()).get();


//        // dmJoinMemberDto에서 사람 정보 지우기
//        dmJoinMemberRepository.deleteByMember_MemberIdAndDmRoom_DmRoomId(member.getMemberId(), dmRoom.getDmRoomId());
//
//        // 채팅방에 남은 사람없으면 채팅방 지우기
//        if (dmJoinMemberRepository.findByDmRoom(room).size()==0) {
//            dmRoom.setDeletedAt(true);
//        }

        return dmRoom.getDmRoomId();
    }

}
