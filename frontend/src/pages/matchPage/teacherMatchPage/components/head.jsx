import * as S from './style';

import LongButton1 from "components/buttons/longbutton1";
import { TryRegister } from 'apis/meetingPageAPIs';
import { useSelector } from "react-redux";
import CalendarModal from 'components/modals/calendarModal';

export default function Head(props) {
  const { year, month, goToday, setMonth } = props;
  const DAY = ['일', '월', '화', '수', '목', '금', '토'];

  const prevButtonClickHandler = (e) => {
    e.preventDefault();
    setMonth(month - 1)
  }

  const nextButtonClickHandler = (e) => {
    e.preventDefault();
    setMonth(month + 1)
  }
  const token = useSelector(state => state.user.token); // accessToken 가져오기


  const registerButtonClickHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await TryRegister(token);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const todayButtonClickHandler = (e) => {
    e.preventDefault();

    goToday()
  }

  return (
    <S.HeadForm>
      <S.Nav>
        <S.Year>
          <p>{year}년 {month}월</p>
        </S.Year>
        <S.ButtonWrapper2>
          <CalendarModal />
          <S.ButtonWrapper>
            <LongButton1 props={{ color: "green", text: "<", callback: prevButtonClickHandler }} />
            <LongButton1 props={{ color: "blue", text: "오늘", callback: todayButtonClickHandler }} />
            <LongButton1 props={{ color: "green", text: ">", callback: nextButtonClickHandler }} />
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
};
