import { useState } from 'react';
import Modal from './modal';

import * as S from './style';

export default function Dates(props) {
  const { lastDate, firstDate, elm, findToday, month, year, idx} =
    props;

  const [userInput, setUserInput] = useState({});
  const [evtList, setEvtList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [clickedDate, setClickedDate] = useState({});
  let dateKey = `${month}` + `${elm}`;
  const registEvent = (value) => {
    setEvtList([...evtList, value]);
    setUserInput('');
    setOpenModal(false);
  };
  const clickHandler = () => {
    setClickedDate({ 'year': year, 'month': month, 'day': elm });
  }
  console.log(clickedDate)

  return (
    <>
      <S.DatesForm
        onClick={clickHandler}
      // onDoubleClick={() => {
      //   setOpenModal(true);
      // }}
      >
        <S.DateNum
          idx={idx}
          lastDate={lastDate}
          firstDate={firstDate}
          findToday={findToday}
        >
          <S.TodayCSS findToday={findToday}>{elm}</S.TodayCSS>
        </S.DateNum>
        {openModal && (
          <Modal
            elm={elm}
            month={month}
            year={year}
            registEvent={registEvent}
            setOpenModal={setOpenModal}
            openModal={openModal}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        )}
        {Boolean(evtList[0]) && (
          <S.Lists>
            {evtList.map((list, index) => {
              return (
                list.slice(0, list.indexOf('_')) === dateKey && (
                  <S.List
                    key={index}
                  // onClick={() => {
                  //   setOpenModal(true);
                  // }}
                  >
                    {list.slice(list.indexOf('_') + 1, list.length)}
                  </S.List>
                )
              );
            })}
          </S.Lists>
        )}
      </S.DatesForm>
    </>
  );
};
