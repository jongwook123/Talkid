import { useState } from "react"

import * as S from './style';

import { TrySignin } from "apis/SigninPageAPIs";

import TALKIDS from 'assets/images/TALKIDS.png';
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";

export default function SigninPage() {
    const [inputs, setInputs] = useState({
        id: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const buttonClickHandler = (e) => {
        e.preventDefault();

        if (!inputs.id) {
            alert("ID를 입력하세요.");

            return;
        }
        
        if (!inputs.password) {
            alert("Password를 입력하세요.");
            
            return;
        }

        TrySignin(inputs.id, inputs.password);
    }

    return (
        <>
            <S.PageHeader>
                <h1>TALKIDS</h1>
            </S.PageHeader>
            <main>
                <S.SigninSection>
                    <S.SigninSectionHeader>
                        <h2>로그인 영역</h2>
                        <img src={TALKIDS} alt="" />
                    </S.SigninSectionHeader>
                    <S.SigninForm action="">
                        <LongInput1 props={{ id: "id", desc: "Insert your id", color: "orange", placeholder: "Your ID", type: "text", value: inputs.id, callback: onChangeHandler}} />
                        <LongInput1 props={{ id: "password", desc: "Insert your password", color: "blue", placeholder: "Your Password", type: "password", value: inputs.password, callback: onChangeHandler}} />
                        <S.ButtonWrapper>
                            <LongButton1 props={{ color: "green", text: "Sign in", callback: buttonClickHandler }} />
                        </S.ButtonWrapper>
                    </S.SigninForm>
                </S.SigninSection>
            </main>
            <footer></footer>
        </>
    )
}
