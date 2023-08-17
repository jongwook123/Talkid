import * as S from "./style";
import { TryGetGroup } from "apis/GroupPageAPIs";
import GroupModal from "components/modals/groupModal";
import Card from "components/cards/groupcards";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TryGetUser } from "apis/GetUserAPIs";
import GroupApplyModal from "components/modals/groupApplyModal";

export default function GroupPage() {
  const token = useSelector((state) => state.user.accessToken);
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);

  const handleFindUser = async () => {
    try {
      const result = await TryGetUser(token);
      setUser(result.response);
    } catch (error) {
      console.error("Error while fetching user:", error);
    }
  };

  const handleFindGroups = async () => {
    const result = await TryGetGroup(token);

    if (!result.success) {
      return;
    }
    setGroups([...result.response]);
  };

  useEffect(() => {
    handleFindUser();
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
                  students: group.members.length - 1,
                  created_date: group.createdAt,
                }}
              ></Card>
            </S.CardItem>
          ))}
          <S.ButtonWrapper>
            {user?.memberType?.memberTypeId === 1 ? <GroupModal /> : <GroupApplyModal />}
          </S.ButtonWrapper>
        </S.CardList>
      </S.PageMain >
      <footer></footer>
    </>
  );
}
