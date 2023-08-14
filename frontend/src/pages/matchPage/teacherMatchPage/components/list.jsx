import { useState } from 'react';

import * as S from './style';
import { useSelector } from 'react-redux';
import { TryGetGroup } from 'apis/GroupPageAPIs';
import { useEffect } from 'react';
import MatchApplyModal from 'components/modals/matchapplymodal';

export default function List(props) {
    const clickedData = props.clickedData;
    const clickedDate = props.clickedData.today
    const token = useSelector(state => state.user.token);

    const [groups, setGroups] = useState([]);

    const handleFindGroups = async () => {
        const result = await TryGetGroup(token);
        setGroups([
            ...result.response
        ]);

    };

    useEffect(() => {
        handleFindGroups();
    }, []);

    return (
        <>
            <S.Listheader>{clickedDate && <>{clickedDate}일's <p>{clickedData && clickedData.type}</p></>}</S.Listheader>

            <S.ScheduleList>
                {clickedData.data && clickedData.data.map((item, index) => (
                    <li key={index}>

                        {clickedData.type === 'meetings' ? (
                            <>
                                <p>{item.groupRes.groupName} & {item.groupReq.groupName}</p>
                                <p>{item.meetingStart.slice(11, 16)} ~ {item.meetingEnd.slice(11, 16)}</p>
                            </>) : (
                            <>
                                <p>{item.group.groupName}</p>
                                <p>{item.group.teacher.school.schoolName} {item.group.teacher.memberName} 선생님</p>
                                <p>{item.meetingScheduleStart.slice(11, 16)} ~ {item.meetingScheduleEnd.slice(11, 16)}</p>
                                {clickedData.type === 'schedules' && (
                                    <S.ButtonWrapper3>
                                        <MatchApplyModal token={token} groups={groups} meetingScheduleId={item.meetingScheduleId} />
                                    </S.ButtonWrapper3>)}
                            </>
                        )}
                    </li>
                )
                )}
            </S.ScheduleList>
        </>
    );
}