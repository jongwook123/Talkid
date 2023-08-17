import AlarmModal from "components/modals/alarmmodal";
import * as S from "./style";
import LongButton1 from "components/buttons/longbutton1";

import Card from "components/cards/studentcards";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TryDeleteGroup, TryGetStudent } from "apis/GroupPageAPIs";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function GroupDetailPage() {
  const params = useParams();
  const groupIdFromUrl = params.groupId;
  const token = useSelector((state) => state.user.accessToken); // accessToken 가져오기

  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const del = async () => {
    await handleDeleteGroups();
    navigate("/group");
  };

  const handleDeleteGroups = async () => {
    const result = await TryDeleteGroup(groupIdFromUrl, token);
    console.log(result);
  };

  const [students, setStudents] = useState([]);

  const handleFindStudents = async () => {
    const result = await TryGetStudent(groupIdFromUrl, token);
    setStudents([...result.response]);
    console.log(result);
  };
  console.log(students);
  useEffect(() => {
    handleFindStudents();
  }, []);

  return (
    <>
      <S.PageHeader>
        <h1>TALKIDS</h1>
      </S.PageHeader>
      <main>
        <S.CardSection>
          <S.CardHeader>
            <S.CardHeaderText>
              <p>STUDENT</p>
              <p>EXP</p>
              <p>BAD WORDS</p>
            </S.CardHeaderText>
          </S.CardHeader>
          <S.CardList>
            {students.map((student, index) => (
              <S.CardItem key={index}>
                <Card
                  props={{
                    studentName: student.member.memberName,
                    badWords: student.member.memberFilterCount,
                    monthExp: student.monthExp,
                    totalExp: student.totalExp,
                  }}
                ></Card>
              </S.CardItem>
            ))}
          </S.CardList>
          <S.ButtonWrapper>
            <AlarmModal props={groupIdFromUrl}/>
          </S.ButtonWrapper>
        </S.CardSection>
      </main>
      <footer></footer>
    </>
  );
}
