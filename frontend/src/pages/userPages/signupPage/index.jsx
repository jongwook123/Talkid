import { useState } from "react"
import * as S from './style'

import TALKIDS from 'assets/images/TALKIDS.png';
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";

export default function SignupPage() {
    const [inputs, setInputs] = useState({
        name: "",
        id: "",
        password: "",
        password_confirm: "",
        type: "student",
    });

    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    const buttonClickHandler = (e) => {
        e.preventDefault();
    }

    return (
        // <main>
        //     <section>
        //         <header>
        //             <h2>회원가입 영역</h2>
        //         </header>
        //         <form action="">
        //             <label htmlFor="name">이름 입력</label>
        //             <input type="text" name="name" id="name" onChange={inputChangeHandler} value={inputs.name} />
        //             <label htmlFor="id">아이디 입력</label>
        //             <input type="text" name="id" id="id" onChange={inputChangeHandler} value={inputs.id} />
        //             <label htmlFor="password">패스워드 입력</label>
        //             <input type="text" name="password" id="password" onChange={inputChangeHandler} value={inputs.password} />
        //             <label htmlFor="password1">패스워드 확인</label>
        //             <input type="text" name="password1" id="password1" onChange={inputChangeHandler} value={inputs.password_confirm} />
        //             <fieldset>
        //                 <legend></legend>
        //                 <input type="radio" name="type" id="student" onChange={inputChangeHandler} value="student" defaultChecked/>
        //                 <label htmlFor="student">학생</label>
        //                 <input type="radio" name="type" id="teacher" onChange={inputChangeHandler} value="teacher"/>
        //                 <label htmlFor="teacher">선생님</label>
        //                 { 
        //                     inputs.type === "teacher" && 
        //                     <>
        //                         <label htmlFor="license">자격</label>
        //                         <input type="file" name="license" id="license" accept="image/png, image/jpeg" onChange={inputChangeHandler} value={inputs.license}/>
        //                     </>
        //                 }
        //             </fieldset>

        //             <button onClick={buttonClickHandler}>Sign up</button>
        //         </form>
        //     </section>
        // </main>
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
                        <LongInput1 props={{ id: "name", desc: "Insert your name", color: "green", placeholder: "Your Name", type: "text", value: inputs.name, callback: onChangeHandler }} />
                        <LongInput1 props={{ id: "id", desc: "Insert your id", color: "orange", placeholder: "Your ID", type: "text", value: inputs.id, callback: onChangeHandler }} />
                        <LongInput1 props={{ id: "password", desc: "Insert your password", color: "blue", placeholder: "Your Password", type: "password", value: inputs.password, callback: onChangeHandler }} />
                        <LongInput1 props={{ id: "password_confirm", desc: "Check your password", color: "green", placeholder: "Confirm Password", type: "password", value: inputs.password_confirm, callback: onChangeHandler }} />
                        <S.ButtonWrapper>
                            <LongButton1 props={{ color: "green", text: "Sign up", callback: buttonClickHandler }} />
                        </S.ButtonWrapper>
                    </S.SigninForm>
                </S.SigninSection>
            </main>
            <footer></footer>
        </>
    )
}