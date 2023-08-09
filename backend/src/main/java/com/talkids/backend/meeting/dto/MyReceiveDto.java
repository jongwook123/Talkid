package com.talkids.backend.meeting.dto;

import com.talkids.backend.group.dto.GroupDto;
import com.talkids.backend.meeting.entity.MeetingJoinReq;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MyReceiveDto {

    @NoArgsConstructor
    @Getter
    public static class Response{
        private List<MyRecieve> receives = new ArrayList<>();

        public static Response fromEntity(List<MeetingJoinReq> reqs){
            Response response = new Response();

            for(MeetingJoinReq req: reqs){
                //각각의 요청에 대해
                GroupDto receiver = GroupDto.fromEntity(req.getMeetingSchedule().getGroup());
                GroupDto sender = GroupDto.fromEntity(req.getGroup());
                LocalDateTime start = req.getMeetingSchedule().getMeetingScheduleStart();
                LocalDateTime end = req.getMeetingSchedule().getMeetingScheduleEnd();

                //dto로 변경해서 넣어주고
                MyRecieve dto = MyRecieve.builder()
                    .meetingJoinReqId(req.getMeetingJoinReqId())
                    .receiver(receiver)
                    .sender(sender)
                    .start(start)
                    .end(end)
                    .build();

                //결과들을 넣어주고
                response.receives.add(dto);
            }


            return response;
        }
    }

    @Builder
    @Getter
    private static class MyRecieve{
        private Integer meetingJoinReqId;
        private GroupDto receiver;          //요청을 받은 그룹
        private GroupDto sender;            //요청을 보낸 그룹
        private LocalDateTime start;        //시작 시간
        private LocalDateTime end;          //종료 시간
    }
}
