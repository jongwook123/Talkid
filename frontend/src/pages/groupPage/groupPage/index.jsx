import * as S from "./style";
import { TryGetGroup } from "apis/GroupPageAPIs";
import GroupModal from "components/modals/groupModal";
import Card from "components/cards/groupcards";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GroupPage() {
    const token = useSelector((state) => state.user.accessToken); // accessToken 가져오기
    const [groups, setGroups] = useState([]);

    const handleFindGroups = async () => {
        const result = await TryGetGroup(token);

        if (!result.success) {
            return;
        }

        console.log(result);
        
        setGroups([...result.response]);
    };

    useEffect(() => {
        handleFindGroups();
    }, []);

    const navigate = useNavigate();

    const onClickHandler = (groupId) => {
        navigate(`/groupdetail/${groupId}`);
    };

    return (
        <>
            <S.PageMain>
                <S.CardList>
                    {groups.map((group, index) => (
                        <S.CardItem
                            key={index}
                            onClick={() => onClickHandler(group.groupId)}
                        >
                            <Card
                                props={{
                                    groupName: group.groupName,
                                    students: group.members.length,
                                    created_date: group.createdAt,
                                }}
                            ></Card>
                        </S.CardItem>
                    ))}
                    <GroupModal />
                </S.CardList>
            </S.PageMain>
            <footer></footer>
        </>
    );
}
