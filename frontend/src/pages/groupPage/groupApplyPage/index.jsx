import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as S from "./style";

import TALKIDS from "assets/images/TALKIDS.png";
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";
import { useNavigate } from "react-router";

import { TrySearchGroup } from "apis/GroupPageAPIs";

export default function GroupApplyPage() {
  const token = useSelector((state) => state.user.token);

  const [groups, setGroups] = useState([]);
  const [input, setInput] = useState("");

  const onChangeHandler = (e) => {
    setInput(input);
  };

  const searchButtonClickHandler = async (e) => {
    e.preventDefault();

    if (!input) {
      alert("검색어를 입력하세요.");

      return;
    }

    try {
      const result = await TrySearchGroup(token, input);
      setGroups([...result.response]);
      console.log(result.response);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonClickHandler = async (e) => {
    e.preventDefault();

    // if (!inputs.id) {
    //     alert("ID를 입력하세요.");

    //     return;
    // }

    try {
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <S.PageHeader>
        <h1>TALKIDS</h1>
      </S.PageHeader>
      <main>
        <S.GroupApplySection>
          <S.GroupApplySectionHeader>
            <h2>그룹 신청 영역</h2>
            <img src={TALKIDS} alt="" />
          </S.GroupApplySectionHeader>
          <S.GroupApplyForm action="">
            <S.InputSection>
              <LongInput1
                props={{
                  id: "keyword",
                  desc: "검색",
                  color: "orange",
                  placeholder: "내용을 입력하세요",
                  type: "text",
                  value: input,
                  callback: onChangeHandler,
                }}
              />
              <LongButton1
                props={{
                  color: "green",
                  text: "검색",
                  callback: searchButtonClickHandler,
                }}
              />
            </S.InputSection>
            <S.ButtonWrapper>
              <LongButton1
                props={{
                  color: "green",
                  text: "Apply",
                  callback: buttonClickHandler,
                }}
              />
            </S.ButtonWrapper>
          </S.GroupApplyForm>
        </S.GroupApplySection>
      </main>
      <footer></footer>
    </>
  );
}
