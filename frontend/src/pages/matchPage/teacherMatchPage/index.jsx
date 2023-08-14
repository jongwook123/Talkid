import { useState, useEffect } from "react";
import Head from "./components/head";
import Body from "./components/body";
import List from "./components/list";
import { GetMeeting } from "apis/meetingPageAPIs";
import { useSelector } from "react-redux";

import * as S from "./style";

export default function TeacherMatchPage() {
  const [clickedData, setClickedData] = useState({});
  let DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [totalDate, setTotalDate] = useState([]);

  // 정보 조회
  const token = useSelector((state) => state.user.token);

  // 내 빈 일정
  const [mySchedules, setMySchedules] = useState(
    Array(32)
      .fill(0)
      .map((_) => [])
  );

  // 모든 빈 일정
  const [schedules, setSchedules] = useState(
    Array(32)
      .fill(0)
      .map((_) => [])
  );

  // 내 일정
  const [meetings, setMeetings] = useState(
    Array(32)
      .fill(0)
      .map((_) => [])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetMeeting(token, year, month);

        const meetingSchedules = result.response.meetingSchedules;
        const matchedMeetings = result.response.meetings;

        const startTimes1 = meetingSchedules.map((schedule) => {
          const startTime = schedule.meetingScheduleStart
            .split("T")[0]
            .slice(8, 10);
          return startTime;
        });

        const mySchedulesCopy = Array(32)
          .fill(0)
          .map((_) => []);
        const schedulesCopy = Array(32)
          .fill(0)
          .map((_) => []);
        startTimes1.forEach((startTime, index) => {
          const day = parseInt(startTime, 10);
          if (meetingSchedules[index].isMine) {
            if (!mySchedulesCopy[day]) {
              mySchedulesCopy[day] = [];
            }
            mySchedulesCopy[day].push(meetingSchedules[index]);
          } else {
            if (!schedulesCopy[day]) {
              schedulesCopy[day] = [];
            }
            schedulesCopy[day].push(meetingSchedules[index]);
          }
        });

        const startTimes2 = matchedMeetings.map((meeting) => {
          const startTime = meeting.meetingStart.split("T")[0].slice(8, 10);
          return startTime;
        });

        const meetingsCopy = Array(32)
          .fill(0)
          .map((_) => []);
        startTimes2.forEach((startTime, index) => {
          const day = parseInt(startTime, 10);
          if (!meetingsCopy[day]) {
            meetingsCopy[day] = [];
          }
          meetingsCopy[day].push(matchedMeetings[index]);
        });

        setMySchedules({ ...mySchedulesCopy });
        setSchedules({ ...schedulesCopy });
        setMeetings({ ...meetingsCopy });
        console.log(mySchedulesCopy, schedulesCopy, meetingsCopy);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [year, month, token]);

  const changeDate = (month) => {
    //이전 날짜
    let PVLastDate = new Date(YEAR, month - 1, 0).getDate();
    let PVLastDay = new Date(YEAR, month - 1, 0).getDay();
    //다음 날짜
    const ThisLasyDay = new Date(YEAR, month, 0).getDay();
    const ThisLasyDate = new Date(YEAR, month, 0).getDate();

    //이전 날짜 만들기
    let PVLD = [];
    if (PVLastDay !== 6) {
      for (let i = 0; i < PVLastDay + 1; i++) {
        PVLD.unshift(PVLastDate - i);
      }
    }
    //다음 날짜 만들기
    let TLD = [];
    for (let i = 1; i < 7 - ThisLasyDay; i++) {
      if (i === 0) {
        return TLD;
      }
      TLD.push(i);
    }

    //현재날짜
    let TD = [];

    TD = [...Array(ThisLasyDate + 1).keys()].slice(1);

    return PVLD.concat(TD, TLD);
  };

  useEffect(() => {
    setTotalDate(changeDate(7));
  }, []);

  useEffect(() => {
    setTotalDate(changeDate(month));
  }, [month]);

  const [today, setToday] = useState(0);

  const goToday = () => {
    let TODAY = new Date().getDate();
    let goMonth = new Date().getMonth() + 1;
    setMonth(goMonth);
    setToday(TODAY);
  };

  return (
    <>
      <S.MatchSection>
        <S.CalendarSection>
          <Head
            year={year}
            month={month}
            setMonth={setMonth}
            goToday={goToday}
          />
          <Body
            totalDate={totalDate}
            today={today}
            month={month}
            year={year}
            mySchedules={mySchedules}
            schedules={schedules}
            meetings={meetings}
            setClickedData={setClickedData}
          />
        </S.CalendarSection>
        <S.ListSection>
          <List clickedData={clickedData} />
        </S.ListSection>
      </S.MatchSection>
    </>
  );
}
