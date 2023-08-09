package com.talkids.backend.meeting.service;

import com.talkids.backend.meeting.dto.PostMeetingDto;
import com.talkids.backend.meeting.entity.Meeting;
import com.talkids.backend.meeting.entity.MeetingJoinReq;
import com.talkids.backend.meeting.entity.MeetingSchedule;
import com.talkids.backend.member.entity.Member;

import java.util.List;

public interface MeetingService {

    /**
     * 년, 월별 성사된 미팅을 반환
     * @param year 미팅이 등록된 년도
     * @param month 미팅이 등록된 월
     * @return 해당 선생이 속한 그룹들의 성사된 모든 미팅들을 List로 반환
     * @throws Exception
     */
    List<Meeting> getMeetingsByYearAndMonth(Integer year, Integer month);

    /**
     * 년, 월별 빈 미팅(성사되지 않은)을 반환
     * @param year 미팅이 등록된 년도
     * @param month 미팅이 등록된 월
     * @return 해당 선생이 속한 그룹들의 빈 미팅(성사되지 않은)들을 List로 반환
     * @throws Exception
     */
    List<MeetingSchedule>  getMeetingSchedulesByYearAndMonth(Integer year, Integer month) throws Exception;

    /**
     * 빈 일정을 등록
     * @param body {groupId, meetingStart, meetingEnd}를 등록
     * @throws Exception 시간대가 겹치는 경우, 해당 멤버가 해당 그룹의 선생이 아닌 경우
     */
    void postEmptyMeeting(Member member, PostMeetingDto.Request body) throws Exception;


    /**
     * member가 groupId를 가진 Group이 meetingScheduleId로 미팅 신청을 합니다
     * @param member 해당 매칭을 신청하는 멤버(선생)
     * @param meetingScheduleId 신청하고자 하는 미팅(빈 일정)
     * @param groupId 신청 하는 그룹의 groupId
     * @throws Exception member가 해당하는 groupId의 주인이 아닌 경우, 이미 신청된 경우
     */
    void applyMeetingSchedule(Member member, Integer meetingScheduleId, Integer groupId) throws Exception;

    /**
     * member의 모든 그룹들이 받은 요청들을 가져옵니다
     * @param member 조회하고자 하는 멤버(선생)
     * @return 미팅 요청을 받은 목록들
     */
    List<MeetingJoinReq> getReceivedRequest(Member member);

    /**
     * member의 모든 그룹이 보낸 요청들을 가져옵니다
     * @param member 조회하고자 하는 멤버(선생)
     * @return 미팅 요청을 한 목록들
     */
    List<MeetingJoinReq> getSendRequest(Member member);

    /**
     * 요청에 대해 해당 멤버가 승인 처리
     * @param member meetingSchedule의 주인, 신청을 받은 쪽 그룹의 선생
     * @param meetingJoinReqId 처리해야되는 meetingJoinReq
     * @throws Exception 해당 요청에 대해 member가 권한이 없는 경우, 존재하지 않는 meetingJoinReq인 경우
     */
    void acceptRequest(Member member, Integer meetingJoinReqId) throws Exception;

    /**
     * 요청에 대해 해당 멤버가 거절 처리
     * @param member meetingSchedule의 주인, 신청을 받은 쪽 그룹의 선생
     * @param meetingJoinReqId 처리해야되는 meeetingJoinReq
     * @throws Exception 해당 요청에 대해 member가 권한이 없는 경우, 존재하지 않는 meetingJoinReq인 경우
     */
    void rejectRequest(Member member, Integer meetingJoinReqId) throws Exception;
}
