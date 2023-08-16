import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as S from "./style";

import DropBox1 from "components/dropboxes/dropbox1";
import LongInput3 from "components/inputs/longinput3";
import LongButton2 from "components/buttons/longbutton2";
import Card from "components/cards/matchcards";

import { FindMembers, TryFollow, GetList, GetFollow, GetUserInfo } from "apis/UserAPIs";
import { useNavigate } from "react-router";

const categoryList = ["Email", "국가", "언어"];
const colors = ['orange', 'green', 'blue'];

export default function StudentMatchPage() {
    const [selectedCategory, setSelectedCategory] = useState("Email");
    const user = useSelector(state => state.user);
    const naviage = useNavigate();
    const color = colors[Math.floor(Math.random() * 3)];

    // ID로 조회
    const [inputs, setInputs] = useState({
        id: "",
    });

    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    // 국가로 조회
    const [countryInfo, setCountryInfo] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchCountryList = async () => {
            const response = await GetList("country");
            setCountryInfo(response.response);
            setCountryList(
                response.response.map((country) => country["countryName"])
            );
        };

        fetchCountryList();
    }, []);

    useEffect(() => {
        if (countryList.length === 0) {
            return;
        }

        setSelectedCountry("Select your country!");
    }, [countryList]);

    useEffect(() => {
        if (selectedCountry !== "") {
            setCategory("country");
            const selectedCountryInfo = countryInfo.find(
                (country) => country.countryName === selectedCountry
            );
            if (selectedCountryInfo) {
                setKeyword(selectedCountryInfo.countryId.toString());
            }
        }
    }, [selectedCountry]);

    // 언어로 조회
    const [languageInfo, setLanguageInfo] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");

    useEffect(() => {
        const fetchLanguageList = async () => {
            const result = await GetList("language");
            setLanguageInfo(result.response);
            setLanguageList(
                result.response.map((language) => language["languageEng"])
            );
        };

        fetchLanguageList();
    }, []);

    useEffect(() => {
        if (languageList.length === 0) {
            return;
        }

        setSelectedLanguage("Select your language!");
    }, [languageList]);

    useEffect(() => {
        if (selectedLanguage !== "") {
            setCategory("language");
            const selectedLanguageInfo = languageInfo.find(
                (language) => language.languageEng === selectedLanguage
            );
            if (selectedLanguageInfo) {
                setKeyword(selectedLanguageInfo.languageId.toString());
            }
        }
    }, [selectedLanguage]);

    // 멤버 조회
    const [category, setCategory] = useState("all");
    const [keyword, setKeyword] = useState("");
    const [members, setMembers] = useState([]);

    const handleFindMembers = async (category, keyword) => {
        const result = await FindMembers(category, keyword);

        if (result.response && Array.isArray(result.response)) {
            const filteredMembers = result.response.filter(
                (member) => member.memberType.memberTypeId === 2
            );

            setMembers([...filteredMembers]);
        }
    };

    const buttonClickHandler = (e) => {
        e.preventDefault();

        setCategory("all");
        setKeyword(inputs.id);
    };

    useEffect(() => {
        handleFindMembers(category, keyword);
    }, [category, keyword]);

    // 디테일
    const [selectedStudent, setSelectedStudent] = useState({});
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleCardItemClick = (student) => {
        if (student.memberId === selectedStudent.memberId) {
            setSelectedStudent("");
        } else {
            setSelectedStudent(student);
        }


        if (!selectedStudent || student === selectedStudent) {
            setIsDetailOpen(!isDetailOpen);
        } else if (student !== selectedStudent && !isDetailOpen) {
            setIsDetailOpen(!isDetailOpen);
        }
    };

    const onClickMessage = async () => {
        const result = await GetUserInfo(user.accessToken);

        naviage("/chatting", {
            state: {
                sender: result.response.memberMail,
                receiver: selectedStudent.memberMail,
            }
        });
    };

    const onClickFollow = async (accessToken, memberId, e) => {
        const result = await TryFollow(accessToken, memberId);

        if (result.success) {
            e.target.innerText = e.target.innerText === 'follow' ? 'unfollow' : 'follow';
        }
    };

    const [following, setFollowing] = useState([]);

    useEffect(() => {
        if (!user.accessToken) {
            return;
        }

        const getFollow = async () => {
            const result = await GetFollow(user.accessToken);

            setFollowing(result.response.Following.map(follow => follow.followMemberId));
        }

        getFollow();
    }, [user]);

    return (
        <>
            <S.PageMain>
                <S.SearchSection>
                    <S.DropboxFieldset>
                        <DropBox1
                            props={{
                                list: categoryList,
                                target: selectedCategory,
                                callback: setSelectedCategory,
                            }}
                        />
                    </S.DropboxFieldset>
                    {selectedCategory === "Email" && (
                        <S.InputSection>
                            <LongInput3
                                props={{
                                    id: "id",
                                    desc: "검색",
                                    placeholder: "내용을 입력하세요",
                                    type: "text",
                                    value: inputs.id,
                                    callback: onChangeHandler,
                                }}
                            />
                            <LongButton2
                                props={{
                                    color: "green",
                                    text: "검색",
                                    callback: buttonClickHandler,
                                }}
                            />
                        </S.InputSection>
                    )}
                    {selectedCategory === "국가" && (
                        <S.DropboxFieldset>
                            <DropBox1
                                props={{
                                    list: countryList,
                                    target: selectedCountry,
                                    callback: setSelectedCountry,
                                }}
                            />
                        </S.DropboxFieldset>
                    )}
                    {selectedCategory === "언어" && (
                        <S.DropboxFieldset>
                            <DropBox1
                                props={{
                                    list: languageList,
                                    target: selectedLanguage,
                                    callback: setSelectedLanguage,
                                }}
                            />
                        </S.DropboxFieldset>
                    )}
                </S.SearchSection>
                <S.MatchSection isDetailOpen={isDetailOpen}>
                    <S.CardList isDetailOpen={isDetailOpen} color={color}>
                        {
                            members.map((student, index) => (
                                <S.CardItem
                                    key={index}
                                    onClick={() => handleCardItemClick(student)}
                                >
                                    <Card
                                        props={{
                                            studentName: student.memberName,
                                            email: student.memberMail,
                                            country: student.country.countryName,
                                            language: student.language.languageEng,
                                            selected: selectedStudent.memberId === student.memberId,
                                        }}
                                    ></Card>
                                </S.CardItem>
                            ))
                        }
                    </S.CardList>
                    <S.DetailSection isDetailOpen={isDetailOpen}>
                        <S.DetailHeader>
                            <h3>{selectedStudent.memberName}</h3>
                            <S.ButtonWrapper>
                                <LongButton2
                                    props={{
                                        text: "Message",
                                        callback: onClickMessage,
                                    }}
                                />
                                <LongButton2
                                    props={{
                                        text: following.includes(selectedStudent.memberId) ? "unfollow" : "follow",
                                        callback: (e) => {
                                            onClickFollow(user.accessToken, selectedStudent.memberId, e);
                                        },
                                    }}
                                />
                            </S.ButtonWrapper>
                        </S.DetailHeader>
                        <S.DetailBody>
                            {selectedStudent && selectedStudent.country && (
                                <p>from {selectedStudent.country.countryName},</p>
                            )}
                            {selectedStudent && selectedStudent.language && (
                                <p>using {selectedStudent.language.languageEng}</p>
                            )}
                        </S.DetailBody>
                        <S.IntroductionSection color={color}>
                            <p>{selectedStudent.memberIntroduce}</p>
                        </S.IntroductionSection>
                    </S.DetailSection>
                </S.MatchSection>
            </S.PageMain>
            <S.Footer></S.Footer>
        </>
    );
}
