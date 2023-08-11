import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import * as S from './style'

import { GetList, GetUserInfo, TryModifyUser, DeleteAccount } from "apis/UserAPIs";

import TALKIDS from 'assets/images/TALKIDS.png';
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";
import DropBox1 from "components/dropboxes/dropbox1";
import LongInput2 from "components/inputs/longinput2";
import InputBox from "components/inputs/inputbox";

export default function UserEditPage() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    // 사용자 입력
    const [inputs, setInputs] = useState({
        name: "",
        id: "",
        password: "",
        password_confirm: "",
        userinfo: "",
    });

    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    // 나라 관련
    const [countryInfo, setCountryInfo] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchCountryList = async () => {
            const response = await GetList('country');
            setCountryInfo(response.response);
            setCountryList(response.response.map(country => country['countryName']));
        };

        fetchCountryList();
    }, []);

    useEffect(() => {
        if (countryList.length === 0) {
            return;
        }

        setSelectedCountry("Select your country!");
    }, [countryList]);

    // 언어 관련
    const [languageInfo, setLanguageInfo] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");

    useEffect(() => {
        const fetchLanguageList = async () => {
            const result = await GetList('language');
            setLanguageInfo(result.response);
            setLanguageList(result.response.map(language => language['languageEng']));
        };

        fetchLanguageList();
    }, []);

    useEffect(() => {
        if (languageList.length === 0) {
            return;
        }

        setSelectedLanguage("Select your language!");
    }, [languageList]);


    // 확인 버튼 클릭
    const buttonClickHandler = async (e) => {
        e.preventDefault();

        if (!inputs.password) {
            alert("Password를 입력하세요.");

            return;
        }

        if (inputs.password !== inputs.password_confirm) {
            alert("비밀번호를 다시 확인해주세요.");

            return;
        }

        if (!selectedCountry) {
            alert("국가를 다시 확인해주세요.");

            return;
        }

        if (!selectedLanguage) {
            alert("언어를 다시 확인해주세요.");

            return;
        }

        const selectedCountryId = countryInfo.filter((country) => {
            if (country["countryName"] === selectedCountry) {
                return true;
            } else {
                return false;
            }
        })[0].countryId;

        const selectedLanguageId = languageInfo.filter((language) => {
            if (language["languageEng"] === selectedLanguage) {
                return true;
            } else {
                return false;
            }
        })[0].languageId;

        try {
            const result = await TryModifyUser(user.accessToken, inputs.password, selectedCountryId, selectedLanguageId, inputs.userinfo);

            if (!result.success) {
                alert(result.error.message);
            } else {
                alert("회원 정보 수정 성공!");
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const DeleteAccount = async (e) => {
        e.preventDefault();

        try {
            const result = await DeleteAccount(user.accessToken);

            if (!result.success) {
                alert(result.error.message);
            } else {
                alert("회원 정보 삭제 성공!");
                navigate("/signin");
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const getUserInfo = async (token) => {
            const result = await GetUserInfo(token);

            if (result.success) {
                setInputs({
                    name: result.response.memberName,
                    id: result.response.memberMail,
                    password: "",
                    password_confirm: "",
                    userinfo: result.response.memberIntroduce,
                });
            } else {
                alert("사용자 정보를 불러오는데 실패했습니다.");
                navigate("/signin");
            }
        }

        getUserInfo(user.accessToken);
    }, [user, navigate, setSelectedCountry, setSelectedLanguage]);

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
                            <LongInput2 props={{ id: "name", desc: "Insert your name", color: "green", placeholder: "Your Name", type: "text", value: inputs.name }} disabled ></LongInput2>
                            <LongInput2 props={{ id: "id", desc: "Insert your name", color: "orange", placeholder: "Your Email", type: "text", value: inputs.id }}></LongInput2>
                            <LongInput1 props={{ id: "password", desc: "Insert your password", color: "blue", placeholder: "Your Password", type: "password", value: inputs.password, callback: onChangeHandler }} />
                            <LongInput1 props={{ id: "password_confirm", desc: "Check your password", color: "green", placeholder: "Confirm Password", type: "password", value: inputs.password_confirm, callback: onChangeHandler }} />
                            <S.DropboxFieldset>
                                <p>Country</p>
                                <DropBox1 props={{ list: countryList, target: selectedCountry, callback: setSelectedCountry }} />
                            </S.DropboxFieldset>
                            <S.DropboxFieldset>
                                <p>Language</p>
                                <DropBox1 props={{ list: languageList, target: selectedLanguage, callback: setSelectedLanguage }} />
                            </S.DropboxFieldset>
                            <InputBox props={{ id: "userinfo", desc: "Check your password", color: "green", placeholder: "userinfo", type: "textarea", value: inputs.userinfo, callback: onChangeHandler }} />
                            <S.ButtonWrapper>
                                <LongButton1 props={{ color: "green", text: "Edit Confirm", callback: buttonClickHandler }} />
                                <LongButton1 props={{ color: "orange", text: "Delete Account", callback: DeleteAccount }} />
                            </S.ButtonWrapper>
                        </S.SigninForm>
                    </S.SigninSection>
                </S.SectionWrapper>
            </S.PageMain>
            <footer></footer>
        </>
    )
}