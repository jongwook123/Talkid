package com.talkids.backend.meeting.service;

import com.talkids.backend.common.exception.NotFoundException;
import com.talkids.backend.meeting.dto.SmallGroupDto;
import com.talkids.backend.meeting.entity.SmallGroup;
import com.talkids.backend.meeting.repository.MeetingRepository;
import com.talkids.backend.meeting.repository.SmallGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SmallGroupServiceImpl implements SmallGroupService {

    private final SmallGroupRepository smallGroupRepository;
    private final MeetingRepository meetingRepository;

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
    
}
