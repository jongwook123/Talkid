import { useState, useEffect } from 'react';

import * as S from './style';

import LongButton1 from 'components/buttons/longbutton1';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ApplyMeeting } from 'apis/meetingPageAPIs';
import DropBox1 from 'components/dropboxes/dropbox1';



function MatchApplyModal({ token, groups, meetingScheduleId }) {
    const [isOpen, setIsOpen] = useState(false);

    const [groupList, setGroupList] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState(null);


    useEffect(() => {
        const groupNameList = groups.map(group => group['groupName'])
        setGroupList([
            ...groupNameList]);
    }, []);


    useEffect(() => {
        if (groupList.length === 0) {
            return;
        }

        setSelectedGroup("Select your group!");
    }, [groupList]);

    useEffect(() => {
        const selectedGroupData = groups.find(group => group.groupName === selectedGroup);
        if (selectedGroupData) {
            setSelectedGroupId(selectedGroupData.groupId);
        }
    }, [selectedGroup]);

    const buttonClickHandler = async (e) => {
        e.preventDefault();

        if (!selectedGroup) {
            alert("그룹을 선택하세요.");

            return;
        }
        try {
            const result = await ApplyMeeting(token, meetingScheduleId, selectedGroupId);

            if (!result.success) {
                alert(result.error.message); // 에러 메시지 표시
            }
        } catch (e) {
            console.log(e)
        }
    }

    const openModalHandler = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
            <S.ModalContainer>
                <LongButton1 props={{ color: "green", text: "미팅 신청", callback: openModalHandler }} />
                {isOpen ?
                    <S.ModalBackdrop onClick={openModalHandler}>
                        <S.ModalView onClick={(e) => e.stopPropagation()}>
                            <S.ModalTitle>미팅 신청</S.ModalTitle>
                            {groupList.length > 0 ? (
                                <>
                                    <S.DropboxFieldset>
                                        <DropBox1 props={{ list: groupList, target: selectedGroup, callback: setSelectedGroup }} />
                                    </S.DropboxFieldset>

                                </>
                            ) : (
                                <p>그룹이 없습니다.</p>
                            )}
                            <S.ButtonWrapper>
                                <LongButton1 props={{ color: "green", text: "Apply", callback: buttonClickHandler }} />
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

export default MatchApplyModal