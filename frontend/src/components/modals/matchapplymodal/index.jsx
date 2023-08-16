import { useState, useEffect } from "react";

import * as S from "./style";

import LongButton1 from "components/buttons/longbutton1";
import { ApplyMeeting } from "apis/meetingPageAPIs";
import DropBox1 from "components/dropboxes/dropbox1";

function MatchApplyModal({ token, groups, meetingScheduleId }) {
  const [isOpen, setIsOpen] = useState(false);

  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    if (groups.length === 0) {
      //만약 선생님이 속해있는 그룹이 없으면
      alert("속한 그룹이 없으면 매칭을 할 수 없습니다");
      setIsOpen(false);
      return;
    }

    //그룹으로부터 groupName만 빼서 나타내기
    const groupNameList = groups.map((group) => group["groupName"]);
    setGroupList(groupNameList);

    setSelectedGroup(groupNameList[0]);
  }, []);

  useEffect(() => {
    //선택한 그룹이 있을 때 마다 실제 값을 변경 해주자(selectedGroup은 단순 name이므로)
    const selectedGroupData = groups.find(
      (group) => group.groupName === selectedGroup
    );

    if (selectedGroupData) {
      setSelectedGroupId(selectedGroupData.groupId);
    }
  }, [selectedGroup]);

  const buttonClickHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await ApplyMeeting(
        token,
        meetingScheduleId,
        selectedGroupId
      );

      if (result.success) {
        alert("Apply Success!!");
        setIsOpen(false);
        return;
      }

      if (!result.success) {
        alert(result.error.message); // 에러 메시지 표시
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <S.ModalContainer>
        <LongButton1
          props={{
            color: "green",
            text: "미팅 신청",
            callback: openModalHandler,
          }}
        />
        {isOpen ? (
          <S.ModalBackdrop onClick={openModalHandler}>
            <S.ModalView onClick={(e) => e.stopPropagation()}>
              <S.ModalTitle>미팅 신청</S.ModalTitle>
              {groupList.length > 0 ? (
                <>
                  <S.DropboxFieldset>
                    <DropBox1
                      props={{
                        list: groupList,
                        target: selectedGroup,
                        callback: setSelectedGroup,
                      }}
                    />
                  </S.DropboxFieldset>
                </>
              ) : (
                <p>그룹이 없습니다.</p>
              )}
              <S.ButtonWrapper>
                <LongButton1
                  props={{
                    color: "green",
                    text: "Apply",
                    callback: buttonClickHandler,
                  }}
                />
                <LongButton1
                  props={{
                    color: "orange",
                    text: "X",
                    callback: openModalHandler,
                  }}
                />
              </S.ButtonWrapper>
            </S.ModalView>
          </S.ModalBackdrop>
        ) : null}
      </S.ModalContainer>
    </>
  );
}

export default MatchApplyModal;
