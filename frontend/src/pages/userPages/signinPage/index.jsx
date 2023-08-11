import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as S from './style';

import { TrySignin } from "apis/UserAPIs";
import { signinUser } from "redux/slice/userSlice";

import TALKIDS from 'assets/images/TALKIDS.png';
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";


export default function SigninPage() {
    // redux 관련
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 사용자 입력 관련
    // 사용자 입력 값 저장
    const [inputs, setInputs] = useState({
        id: "",
        password: "",
    });

    // 사용자 입력 시
    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const buttonClickHandler = async (e) => {
        e.preventDefault();

        if (!inputs.id) {
            alert("email을 입력하세요.");

            return;
        }

        if (!inputs.password) {
            alert("Password를 입력하세요.");

            return;
        }
        
        try {
            const result = await TrySignin(inputs.id, inputs.password);
            
            if (!result.success) {
                alert("아이디 혹은 비밀번호가 일치하지 않습니다.")
            } else {
                dispatch(signinUser({
                    "accessToken": result.response.accessToken,
                    "refreshToken": result.response.refreshToken,
                }));
    
                navigate("/");
            }
        } catch (error) {
            console.log(error)
        }
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
                        <LongInput1 props={{ id: "id", desc: "Insert your e-mail", color: "orange", placeholder: "Your E-mail", type: "text", value: inputs.id, callback: onChangeHandler}} />
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
