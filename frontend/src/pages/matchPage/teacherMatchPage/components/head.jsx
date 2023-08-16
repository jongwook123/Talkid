import * as S from "./style";

import LongButton1 from "components/buttons/longbutton1";
import { TryRegister } from "apis/meetingPageAPIs";
import { useSelector } from "react-redux";
import CalendarModal from "components/modals/calendarModal";

export default function Head(props) {
  const { year, month, goToday, setYear, setMonth } = props;
  const DAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const prevButtonClickHandler = (e) => {
    e.preventDefault();
    const prev = year * 12 + month - 2;
    const prevYear = Math.floor(prev / 12);
    const prevMonth = prev % 12;
    setYear(prevYear);
    setMonth(prevMonth + 1);
  };

  const nextButtonClickHandler = (e) => {
    e.preventDefault();
    const next = year * 12 + month;
    const prevYear = Math.floor(next / 12);
    const prevMonth = next % 12;
    setYear(prevYear);
    setMonth(prevMonth + 1);
  };
  const token = useSelector((state) => state.user.accessToken); // accessToken 가져오기

  const registerButtonClickHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await TryRegister(token);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const todayButtonClickHandler = (e) => {
    e.preventDefault();
    goToday();
  };

  return (
    <S.HeadForm>
      <S.Nav>
        <S.Year>
          <p>
            {year}. {month}.
          </p>
        </S.Year>
        <S.ButtonWrapper2>
          <CalendarModal />
          <S.ButtonWrapper>
            <LongButton1
              props={{
                color: "green",
                text: "<",
                callback: prevButtonClickHandler,
              }}
            />
            <LongButton1
              props={{
                color: "blue",
                text: "Today",
                callback: todayButtonClickHandler,
              }}
            />
            <LongButton1
              props={{
                color: "green",
                text: ">",
                callback: nextButtonClickHandler,
              }}
            />
          </S.ButtonWrapper>
        </S.ButtonWrapper2>
      </S.Nav>
      <S.Days>
        {DAY.map((elm, idx) => {
          return <S.Day key={idx}>{elm}</S.Day>;
        })}
      </S.Days>
    </S.HeadForm>
  );
}
