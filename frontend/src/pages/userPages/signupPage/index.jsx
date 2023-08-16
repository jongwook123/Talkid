import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router";

import * as S from './style'

import { TrySignup, GetList } from "apis/UserAPIs";

import TALKIDS from 'assets/images/TALKIDS.png';
import LongInput1 from "components/inputs/longinput1";
import LongButton1 from "components/buttons/longbutton1";
import DropBox1 from "components/dropboxes/dropbox1";
import { Link } from "react-router-dom";

function ImagePreview({ image, deleteFunc }) {
    return (
        <S.ImagePreview draggable>
            <img src={image} alt="preview" />
            <S.ImagePreviewIconWrapper onClick={deleteFunc}>
                <span>x</span>
            </S.ImagePreviewIconWrapper>
        </S.ImagePreview>
    );
}

export default function SignupPage({ max = 3 }) {
    const navigate = useNavigate();

    // 사용자 입력
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

    // 이미지 업로드
    const [uploadedImages, setUploadedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const uploadBoxRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        const uploadBox = uploadBoxRef.current;
        const input = inputRef.current;

        const handleFiles = (files) => {
            for (const file of files) {
                if (!file.type.startsWith("image/")) continue;
                const reader = new FileReader();
                reader.onloadend = (e) => {
                    const result = e.target.result;
                    if (result) {
                        setUploadedImages((state) => [...state, result].slice(0, max));
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        const changeHandler = (event) => {
            const files = event.target.files;
            handleFiles(files);
        };

        const dropHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const files = event.dataTransfer.files;
            handleFiles(files);
        };

        const dragOverHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        uploadBox.addEventListener("drop", dropHandler);
        uploadBox.addEventListener("dragover", dragOverHandler);
        input.addEventListener("change", changeHandler);

        return () => {
            uploadBox.removeEventListener("drop", dropHandler);
            uploadBox.removeEventListener("dragover", dragOverHandler);
            input.removeEventListener("change", changeHandler);
        };
    }, [max]);

    useEffect(() => {
        const imageJSXs = uploadedImages.map((image, index) => {
            const isDeleteImage = (element) => {
                return element === image;
            };

            const deleteFunc = () => {
                uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
                setUploadedImages([...uploadedImages]);
            };

            return <ImagePreview image={image} deleteFunc={deleteFunc} key={index} />;
        });
        setPreviewImages(imageJSXs);
    }, [uploadedImages]);

    // 나라 관련
    const [countryInfo, setCountryInfo] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchCountryList = async () => {
            const response = await GetList('country');
            setCountryInfo(response.response.filter(country => country.countryCode === 'USA' || country.countryCode === 'KOR'));
            setCountryList(response.response.filter(country => country.countryCode === 'USA' || country.countryCode === 'KOR').map(country => country['countryName']));
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
            setLanguageInfo(result.response.filter(language => language.languageCode === 'en' || language.languageCode === 'ko'));
            setLanguageList(result.response.filter(language => language.languageCode === 'en' || language.languageCode === 'ko').map(language => language['languageEng']));
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

        if (!inputs.name) {
            alert("이름을 입력하세요.");

            return;
        }

        if (!inputs.id) {
            alert("Email을 입력하세요.");

            return;
        }

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

        const regex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);

        if (!regex.test(inputs.id)) {
            alert("이메일 형식이 유효하지 않습니다.");

            return;
        }

        const schoolid = Math.floor(Math.random() * 4 + 1);

        const membertypeid = inputs.type === 'student' ? 2 : 1;

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
            const result = await TrySignup(inputs.id, inputs.password, inputs.name, schoolid, selectedCountryId, selectedLanguageId, membertypeid);

            if (!result.success) {
                alert(result.error.message);
            } else {
                navigate("/signin");
            }
        } catch (e) {
            console.log(e);
        }
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
                            <Link to='/'>
                                <h2>회원가입 영역</h2>
                                <img src={TALKIDS} alt="" />
                            </Link>
                        </S.SigninSectionHeader>
                        <S.SigninForm action="">
                            <LongInput1 props={{ id: "name", desc: "Insert your name", color: "green", placeholder: "Your Name", type: "text", value: inputs.name, callback: onChangeHandler }} />
                            <LongInput1 props={{ id: "id", desc: "Insert your email", color: "orange", placeholder: "Your Email", type: "text", value: inputs.id, callback: onChangeHandler }} />
                            <LongInput1 props={{ id: "password", desc: "Insert your password", color: "blue", placeholder: "Your Password", type: "password", value: inputs.password, callback: onChangeHandler }} />
                            <LongInput1 props={{ id: "password_confirm", desc: "Check your password", color: "green", placeholder: "Confirm Password", type: "password", value: inputs.password_confirm, callback: onChangeHandler }} />
                            <S.RadioFieldset>
                                <legend>회원 분류 선택 영역</legend>
                                <input type="radio" name="type" id="student" onChange={onChangeHandler} value="student" defaultChecked />
                                <label htmlFor="student">Student</label>
                                <input type="radio" name="type" id="teacher" onChange={onChangeHandler} value="teacher" />
                                <label htmlFor="teacher">Teacher</label>
                            </S.RadioFieldset>
                            <S.StyledImageFieldset visible={inputs.type === 'teacher'}>
                                <legend>이미지 입력 영역</legend>
                                <S.StyledImageUploadBox >
                                    <S.StyledImageUploadLabel htmlFor="imgInput" ref={uploadBoxRef}>
                                        <S.StyledImageUploadTextBox>
                                            <p>Click or drag image into here to upload image</p>
                                        </S.StyledImageUploadTextBox>
                                    </S.StyledImageUploadLabel>
                                    <input type="file" multiple accept="image/*" id="imgInput" ref={inputRef} />
                                    <S.StyledPreviewWrapper exist={previewImages.length !== 0}>
                                        <S.StyledPreviewContainer>{previewImages}</S.StyledPreviewContainer>
                                    </S.StyledPreviewWrapper>
                                </S.StyledImageUploadBox>
                            </S.StyledImageFieldset>
                            <S.DropboxFieldset>
                                <p>Country</p>
                                <DropBox1 props={{ list: countryList, target: selectedCountry, callback: setSelectedCountry }} />
                            </S.DropboxFieldset>
                            <S.DropboxFieldset>
                                <p>Language</p>
                                <DropBox1 props={{ list: languageList, target: selectedLanguage, callback: setSelectedLanguage }} />
                            </S.DropboxFieldset>
                            <S.ButtonWrapper>
                                <LongButton1 props={{ color: "green", text: "Sign up", callback: buttonClickHandler }} />
                            </S.ButtonWrapper>
                        </S.SigninForm>
                    </S.SigninSection>
                </S.SectionWrapper>
            </S.PageMain>
            <footer></footer>
        </>
    )
}