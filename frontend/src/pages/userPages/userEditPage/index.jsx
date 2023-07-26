import { useState } from "react"
import * as S from './style'

import TALKIDS from 'assets/images/TALKIDS.png';
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";
import DropBox1 from "components/dropboxes/dropbox1";
import { useRef } from "react";
import { useEffect } from "react";
import LongInput2 from "components/inputs/longinput2";


const dummyCountryList = ["Republic of Korea", "United States of America", "Japan", "China"];
const dummyLanguageList = ["Korean", "English", "Japanese", "Chinese"];






export default function UserEditPage({ max = 10 }) {
    // 사용자 입력
    const [inputs, setInputs] = useState({
        name : 'Park',
        id : 'abcd1234@naver.com',
        password:'12345678',
        type: 'student',
        country:'Republic of Korea',
        language:'Korean',
    });

    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    
    }

    // 나라 관련
    const [counrtyList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        setCountryList(dummyCountryList);
    }, []);

    useEffect(() => {
        if (counrtyList.length === 0) {
            return;
        }

        setSelectedCountry(inputs.country);
    }, [counrtyList]);

    // 언어 관련
    const [languageList, setLanguageList] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");

    useEffect(() => {
        setLanguageList(dummyLanguageList);
    }, []);

    useEffect(() => {
        if (languageList.length === 0) {
            return;
        }

        setSelectedLanguage(inputs.language);
    }, [languageList]);


    // 확인 버튼 클릭
    const buttonClickHandler = (e) => {
        e.preventDefault();
        
    }

    

    return (
        <>
            <S.PageHeader>
                <h1>TALKIDS</h1>
            </S.PageHeader>
            <S.PageMain>
                <S.SectionWrapper>
                    <S.SigninSection>
                        <S.SigninSectionHeader>
                            <h2>로그인 영역</h2>
                            <img src={TALKIDS} alt="" />
                        </S.SigninSectionHeader>
                        <S.SigninForm action="">
                            {/* <LongInput1 props={{ id: "name", desc: "Insert your name", color: "green", placeholder: "Your Name", type: "text", value: dummyUser.name,}} />
                            <LongInput1 props={{ id: "id", desc: "Insert your id", color: "orange", placeholder: "Your ID", type: "text", value: dummyUser.language,}} /> */}
                            <LongInput2 props={{ id: "name", desc: "Insert your name", color: "green", placeholder: "name", type: "text", value: inputs.name}} disabled ></LongInput2>
                            <LongInput2 props={{ id: "id", desc: "Insert your name", color: "green", placeholder: "email", type: "text", value: inputs.id,}}></LongInput2>
                            <LongInput1 props={{ id: "password", desc: "Insert your password", color: "blue", placeholder: "Your Password", type: "password", value: inputs.password, callback: onChangeHandler }} />
                            <LongInput1 props={{ id: "password_confirm", desc: "Check your password", color: "green", placeholder: "Confirm Password", type: "password", value: inputs.password_confirm, callback: onChangeHandler }} />
                            <S.DropboxFieldset>
                                <p>Country</p>
                                <DropBox1 props={{ list: counrtyList, target: selectedCountry, callback: setSelectedCountry }} />
                            </S.DropboxFieldset>
                            <S.DropboxFieldset>
                                <p>Language</p>
                                <DropBox1 props={{ list: languageList, target: selectedLanguage, callback: setSelectedLanguage }} />
                            </S.DropboxFieldset>
                            <S.ButtonWrapper>
                                <LongButton1 props={{ color: "green", text: "Edit Confirm", callback: buttonClickHandler }} />
                            </S.ButtonWrapper>
                        </S.SigninForm>
                    </S.SigninSection>
                </S.SectionWrapper>
            </S.PageMain>
            <footer></footer>
        </>
    )
}