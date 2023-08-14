import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import * as S from './style';

import LongInput1 from 'components/inputs/longinput1';
import LongButton1 from 'components/buttons/longbutton1';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TryApplyGroup, TrySearchGroup } from "apis/GroupPageAPIs";

function GroupApplyModal() {
  const token = useSelector(state => state.user.token);

  const [groups, setGroups] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({
    keyword: "",
  });

  const onChangeHandler = (e) => {
      setInputs({
          ...inputs,
          [e.target.name]: e.target.value,
      });
  }
  const [selectedGroupId, setSelectedGroupId] = useState(null); // 초기 선택 상태는 없음(null)로 설정

  const handleListClicked = (groupId) => {
    setSelectedGroupId(groupId);
    
  }
  


  const searchButtonClickHandler = async (e) => {
    e.preventDefault();

    if (!inputs.keyword) {
        alert("검색어를 입력하세요.");

        return;
    }


    try {
        const result = await TrySearchGroup(token, inputs.keyword);
        setGroups([
            ...result.response
        ]);
        console.log(result.response)

    } catch (error) {
        console.log(error)
        
    }
    }

    const buttonClickhandler = async (e) => {
      e.preventDefault();
      try {
          const result = await TryApplyGroup(token, selectedGroupId);
          console.log(result);
          if (!result.success) {
            alert(result.error.message); // 에러 메시지 표시
          }
        } catch (error) {
        console.log(error)
          
      }
  };

  
  const openModalHandler = () => {
    setIsOpen(!isOpen);
    setGroups([]);
    setInputs({
      keyword: "",
    });
  };

  return (
    <>
      <S.ModalContainer>
        <S.ModalBtn onClick={openModalHandler}>
          <AddCircleOutlineIcon />
        </S.ModalBtn>
        {isOpen ?
          <S.ModalBackdrop onClick={openModalHandler}>
            <S.ModalView onClick={(e) => e.stopPropagation()}>
            <S.GroupApplyForm action="">
                    <S.InputSection>
                            <LongInput1
                                props={{
                                    id: 'keyword',
                                    desc: '검색',
                                    color: 'orange',
                                    placeholder: '내용을 입력하세요',
                                    type: 'text',
                                    value: inputs.keyword,
                                    callback: onChangeHandler,
                                }}
                            />
                            <LongButton1 props={{ color: "green", text: "검색", callback: searchButtonClickHandler }} />
                        </S.InputSection>
                        <S.GroupList>
                        {groups.map(group => (
                          <S.Group key={group.groupId} onClick={() => handleListClicked(group.groupId)} isSelected={selectedGroupId === group.groupId}>
                            {group.groupName}
                          </S.Group>
                        ))}
                        </S.GroupList>
                        <S.ButtonWrapper>
                            <LongButton1 props={{ color: "green", text: "Apply", callback: buttonClickhandler }} />
                        </S.ButtonWrapper>
                    </S.GroupApplyForm>
            </S.ModalView>
          </S.ModalBackdrop>
          : null
        }
      </S.ModalContainer>
    </>
  );
}

export default GroupApplyModal;
