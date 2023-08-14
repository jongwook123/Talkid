import { useState } from "react";
import { useNavigate } from "react-router";

import * as S from "./style";

import { TryFindPassword } from "apis/UserAPIs";

import TALKIDS from "assets/images/TALKIDS.png";
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";

export default function FindPasswordPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
  });

  const onChangeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const buttonClickHandler = async (e) => {
    e.preventDefault();

    if (!inputs.email) {
      alert("E-mail를 입력하세요.");

      return;
    }

    const regex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);

    if (!regex.test(inputs.email)) {
      alert("이메일 형식이 유효하지 않습니다.");

      return;
    }

    const result = await TryFindPassword(inputs.email);

    if (!result.success) {
      alert("비밀번호 발급 실패, 다시 확인해주세요.");
    } else {
      alert("비밀번호 발급 성공!");
      navigate("/signin");
    }
  };

  return (
    <>
      <S.PageHeader>
        <h1>TALKIDS</h1>
      </S.PageHeader>
      <main>
        <S.FindPasswordSection>
          <S.FindPasswordSectionHeader>
            <h2>비밀번호찾기 영역</h2>
            <img src={TALKIDS} alt="" />
          </S.FindPasswordSectionHeader>
          <S.FindPasswordForm action="">
            <LongInput1
              props={{
                id: "email",
                desc: "Insert your email",
                color: "orange",
                placeholder: "Your E-mail",
                type: "text",
                value: inputs.email,
                callback: onChangeHandler,
              }}
            />
            <S.ButtonWrapper>
              <LongButton1
                props={{
                  color: "green",
                  text: "Send New Password",
                  callback: buttonClickHandler,
                }}
              />
            </S.ButtonWrapper>
          </S.FindPasswordForm>
        </S.FindPasswordSection>
      </main>
      <footer></footer>
    </>
  );
}
