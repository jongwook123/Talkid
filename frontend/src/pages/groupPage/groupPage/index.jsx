// import { useState } from 'react';

import * as S from './style';

import { TryGetGroup } from 'apis/GroupPageAPIs';
import Modal from 'components/modals';
import Card from "components/cards/groupcards";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupPage() {

    
    const memberId = 2

    const [groups, setGroups] = useState([]);


    const handleFindGroups = async (memberId) => {
        const result = await TryGetGroup(memberId);
        setGroups([
            ...result.response
        ]);
        

    };
 
    
    
    useEffect(() => {
        handleFindGroups(memberId);
    }, []);


    const navigate = useNavigate();

    const onClickHandler = (groupId) => {
        navigate(`/groupdetail/${groupId}`);
    }
    
    console.log(groups)
    return (
        <>
            <S.PageHeader>
                <h1>TALKIDS</h1>
            </S.PageHeader>
            <main>
                <S.CardList>
                    {groups.map((group, index) => (
                        <S.CardItem key={index} onClick={() => onClickHandler(group.groupId)}>
                            <Card props={{ groupName: group.groupName, students: group.groupJoinMember.length, created_date: group.createdAt, }}></Card>
                        </S.CardItem>
                    ))}
                    <Modal />
                </S.CardList>
            </main>
            <footer></footer>
        </>
    )

}
