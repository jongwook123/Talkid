import * as S from './style';

export default function Modal(props) {
  const {
    elm,
    month,
    year,
    registEvent,
    setOpenModal,
    userInput,
    setUserInput,
  } = props;

  const userText = (e) => {
    let date = `${month}` + `${elm}`;

    setUserInput(`${date}_` + e.target.value);
  };

  return (
    <S.ModalForm>
      <S.Header>일정 등록</S.Header>
      <S.ViewDate>
        날짜 {year}.{month}.{elm}
      </S.ViewDate>
      <S.Events>
        <S.Contexts
          placeholder="Event를 입력하세요"
          onChange={(e) => {
            userText(e);
          }}
        ></S.Contexts>
      </S.Events>
      <S.RegistBtn
        onClick={() => {
          registEvent(userInput);
        }}
      >
        등록
      </S.RegistBtn>
      <S.Close
        onClick={() => {
          setOpenModal(false);
        }}
      >
        닫기
      </S.Close>
    </S.ModalForm>
  );
};

