package com.talkids.backend.meeting.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.meeting.repository.SmallGroupMemberRepository;
import com.talkids.backend.meeting.dto.SmallGroupDto;
import com.talkids.backend.meeting.entity.SmallGroup;
import com.talkids.backend.meeting.entity.SmallGroupMember;
import com.talkids.backend.meeting.repository.MeetingRepository;
import com.talkids.backend.meeting.repository.SmallGroupRepository;
import com.talkids.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SmallGroupServiceImpl implements SmallGroupService {

    private final SmallGroupRepository smallGroupRepository;
    private final MeetingRepository meetingRepository;
    private final SmallGroupMemberRepository smallGroupMemberRepository;

    /** 소그룹 리스트 조회 */
    @Override
    public List<SmallGroup> getSmallGroupList(int meetingId) throws NotFoundException {
        return smallGroupRepository.findByMeeting_MeetingIdOrderBySmallGroupName(meetingId);
    }

    /** 소그룹 생성 */
    @Transactional
    @Override
    public int createSmallGroup(SmallGroupDto.Request req) throws NotFoundException {
        if(meetingRepository.findById(req.getMeetingId()).isEmpty())
            throw new NotFoundException("등록된 미팅이 없습니다.");

        // 소그룹 정보 DB에 저장
        smallGroupRepository.save(
                req.saveSmallGroupDto(
                    meetingRepository.findById(req.getMeetingId()).get()
                )
        );

        return req.getMeetingId();
    }

    /** 소그룹 삭제 */
    @Transactional
    @Override
    public String deleteSmallGroup(int smallGroupId) throws NotFoundException {
        if(smallGroupRepository.findBySmallGroupId(smallGroupId).isEmpty())
            throw new NotFoundException("등록된 소그룹이 없습니다.");

        // 소그룹 정보 DB에서 삭제
        smallGroupRepository.deleteBySmallGroupId(smallGroupId);

        return "Success";
    }

    /** 소그룹 입장 */
    @Transactional
    @Override
    public SmallGroupDto.Response enterSmallGroup(Member member, int smallGroupId) throws NotFoundException {
        SmallGroup smallGroup = smallGroupRepository.findBySmallGroupId(smallGroupId)
                .orElseThrow(() -> new NotFoundException("등록된 소그룹이 없습니다."));

        Optional<SmallGroupMember> smallGroupMember = smallGroupMemberRepository.findByMember_MemberId(member.getMemberId());
        
        // 소그룹에 안 들어가있으면, 저장
        if(smallGroupMember.isEmpty()){
            smallGroupMemberRepository.save(
                SmallGroupMember.builder()
                        .smallGroup(smallGroup)
                        .member(member)
                        .build()
            );
        } else {
            // 이미 다른 소그룹에 들어가있으면, 소그룹 변경
            smallGroupMember.get().setSmallGroup(smallGroup);
        }

        return SmallGroupDto.Response.smallGroupResponseDto(
                smallGroup.getMeeting().getMeetingId(),
                smallGroupId,
                smallGroup.getSmallGroupName(),
                member.getMemberName()
        );

    }

    /** 소그룹 퇴장 */
    @Transactional
    @Override
    public String exitSmallGroup(Member member) throws NotFoundException {
        smallGroupMemberRepository.findByMember_MemberId(member.getMemberId())
                .orElseThrow(()-> new NotFoundException("소그룹에 등록된 회원이 아닙니다."));

        smallGroupMemberRepository.deleteByMember_MemberId(member.getMemberId());

        return "Success";
    }

}
