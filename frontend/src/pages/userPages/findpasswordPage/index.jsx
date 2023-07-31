import { useState } from "react"

import * as S from './style';

import { TryFindPassword } from "apis/FindpasswordPageAPIs";

import TALKIDS from 'assets/images/TALKIDS.png';
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";

export default function FindPasswordPage() {
    const [inputs, setInputs] = useState({
        email: "",
        code: "",
    });

    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const buttonClickHandler = (e) => {
        e.preventDefault();

        if (!inputs.email) {
            alert("E-mail를 입력하세요.");

            return;
        }

        TryFindPassword(inputs.email);
    }

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
                        <S.SendWrapper>
                            <LongInput1 props={{ id: "email", desc: "Insert your email", color: "orange", placeholder: "Your E-mail", type: "text", value: inputs.email, callback: onChangeHandler }} />
                            <LongButton1 props={{ color: "blue", text: "Send", callback: buttonClickHandler }} />
                        </S.SendWrapper>
                        <LongInput1 props={{ id: "code", desc: "Insert your verification code", color: "blue", placeholder: "Verification code", type: "code", value: inputs.code, callback: onChangeHandler }} />
                        <S.ButtonWrapper>
                            <LongButton1 props={{ color: "green", text: "Send New Password", callback: buttonClickHandler }} />
                        </S.ButtonWrapper>
                    </S.FindPasswordForm>
                </S.FindPasswordSection>
            </main>
            <footer></footer>
        </>
    )
}
