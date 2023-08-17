import { useState } from 'react';
import { useSelector } from "react-redux";

import * as S from './style';

import LongInput1 from 'components/inputs/longinput1';
import LongButton1 from 'components/buttons/longbutton1';
import { TryDeleteGroup } from 'apis/GroupPageAPIs';
import { useNavigate } from 'react-router';

export default function AlarmModal(groupId) {
  const token = useSelector(state => state.user.accessToken);
  console.log(groupId)
  const [isOpen, setIsOpen] = useState(false);
  
    const buttonClickhandler = async (e) => {
      e.preventDefault();
      try {
          const result = await TryDeleteGroup(groupId.props, token);
          if (result.success) {
            alert("Deleted!!");
            setIsOpen(false);
            navigate("/group");
            return;
          }

          if (!result.success) {
            alert('Cannot Delete'); // 에러 메시지 표시
            setIsOpen(false);
            return;
          }
        } catch (error) {
        console.log(error)
          
      }
      
  };

  const navigate = useNavigate();

  // const del = async () => {
  //   await handleDeleteGroups();
  //   navigate("/group");
  // };

  // const handleDeleteGroups = async () => {
  //   const result = await TryDeleteGroup(groupId, token);
  //   console.log(result);
  // };

  
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <S.ModalContainer>
      <LongButton1
              props={{ color: "orange", text: "Delete", callback: openModalHandler }}
            />
        {isOpen ?
          <S.ModalBackdrop onClick={openModalHandler}>
            <S.ModalView onClick={(e) => e.stopPropagation()}>
              <p>Are you sure?</p>
                <S.ButtonWrapper>
                    <LongButton1 props={{ color: "green", text: "Delete", callback: buttonClickhandler }} />
                    <LongButton1 props={{ color: "orange", text: "X", callback: openModalHandler}} />
                </S.ButtonWrapper>
            </S.ModalView>
          </S.ModalBackdrop>
          : null
        }
      </S.ModalContainer>
    </>
  );
}

