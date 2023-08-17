import Dates from "./dates";

import * as S from "./style";

export default function Body(props) {
  const {
    totalDate,
    today,
    month,
    year,
    mySchedules,
    schedules,
    meetings,
    setClickedData,
  } = props;
  const lastDate = totalDate.indexOf(1);
  const firstDate = totalDate.indexOf(1, 7);

  //today
  const findToday = totalDate.indexOf(today);
  const getMonth = new Date().getMonth() + 1;

  return (
    <S.BodyForm>
      {totalDate.map((elm, idx) => {
        return (
          <Dates
            key={idx}
            idx={idx}
            lastDate={lastDate}
            firstDate={firstDate}
            elm={elm}
            findToday={findToday === idx && month === getMonth && findToday}
            mySchedules={mySchedules[elm]}
            schedules={schedules[elm]}
            meetings={meetings[elm]}
            setClickedData={setClickedData}
          ></Dates>
        );
      })}
    </S.BodyForm>
  );
}
