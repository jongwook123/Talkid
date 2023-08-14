import { useState } from 'react';

import * as S from './style';

import LongInput1 from 'components/inputs/longinput1';
import LongButton1 from 'components/buttons/longbutton1';
import { TryRegister } from 'apis/meetingPageAPIs';
import { TryGetGroup } from 'apis/GroupPageAPIs';
import Calendar from 'components/calendar';
import { useSelector } from 'react-redux';


function CalendarModal() {
  const token = useSelector(state => state.user.token);

  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({
    groupName: "",
    groupImage: "",
  });

  const [meetingStart, setMeetingStart] = useState(new Date());
  const [meetingEnd, setMeetingEnd] = useState(new Date());

  const onChangeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const buttonClickHandler = async (e) => {
    e.preventDefault();

    if (!inputs.groupName) {
      alert("그룹이름을 입력하세요.");
      return;
    }

    try {
      const response = await TryGetGroup(token);
      const matchingGroup = response.response.find(group => group.groupName === inputs.groupName);

      if (matchingGroup) {
        const groupId = matchingGroup.groupId;

        // Now, call TryRegister with the retrieved groupId, meetingStart, and meetingEnd
        await TryRegister(token, groupId, meetingStart, meetingEnd);

        // Refresh the page (you need to define refreshPage function)
        refreshPage();
      } else {
        alert("해당 그룹을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const openModalHandler = () => {
    setIsOpen(!isOpen)
  };

  return (
    <>
      <S.ModalContainer>
        <LongButton1 props={{ color: "orange", text: "일정 등록", callback: openModalHandler }} />
        {isOpen ?
          <S.ModalBackdrop onClick={openModalHandler}>
            <S.ModalView onClick={(e) => e.stopPropagation()}>
              <LongInput1 props={{ id: "groupName", desc: "Insert groupname", color: "orange", placeholder: "Group Name", type: "text", value: inputs.groupName, callback: onChangeHandler }} />
              <Calendar selectedMeetingStart={meetingStart}
                setSelectedMeetingStart={setMeetingStart}
                selectedMeetingEnd={meetingEnd}
                setSelectedMeetingEnd={setMeetingEnd} />
              <S.ButtonWrapper>
                <LongButton1 props={{ color: "green", text: "Register", callback: buttonClickHandler }} />
                <LongButton1 props={{ color: "orange", text: "X", callback: openModalHandler }} />
              </S.ButtonWrapper>
            </S.ModalView>
          </S.ModalBackdrop>
          : null
        }
      </S.ModalContainer>
    </>
  );
};

export default CalendarModal