import * as S from "./style";

export default function Dates(props) {
  const {
    lastDate,
    firstDate,
    elm,
    findToday,
    idx,
    mySchedules,
    schedules,
    meetings,
    setClickedData,
  } = props;

  const clickHandler = (type, data) => {
    setClickedData({ type: type, data: data, today: elm });
  };
  return (
    <>
      <S.DatesForm>
        <S.DateNum
          idx={idx}
          lastDate={lastDate}
          firstDate={firstDate}
          findToday={findToday}
        >
          <S.TodayCSS findToday={findToday}>{elm}</S.TodayCSS>
        </S.DateNum>
        <S.Lists>
          <S.ListMySchedules
            onClick={() => clickHandler("mySchedules", mySchedules)}
          >
            {mySchedules.length !== 0 && mySchedules.length}
          </S.ListMySchedules>
          <S.ListSchedules onClick={() => clickHandler("schedules", schedules)}>
            {schedules.length !== 0 && schedules.length}
          </S.ListSchedules>
          <S.ListMeetings onClick={() => clickHandler("meetings", meetings)}>
            {meetings.length !== 0 && meetings.length}
          </S.ListMeetings>
        </S.Lists>
      </S.DatesForm>
    </>
  );
}
