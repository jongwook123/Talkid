import { useState, useEffect } from 'react';

import * as S from './style';

import DropBox1 from 'components/dropboxes/dropbox1';
import LongInput1 from 'components/inputs/longinput1';
import { FindMembers } from 'apis/StudentMatchPageAPIs';
import { GetList } from 'apis/GetListAPIs';
import Card from "components/cards/matchcards";
import LongButton1 from "components/buttons/longbutton1";

export default function StudentMatchPage() {
    const categoryList = ['ID', '국가', '언어']
    const [selectedCategory, setSelectedCategory] = useState("ID")

    // ID로 조회
    const [inputs, setInputs] = useState({
        id: "",
    });

    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    // 국가로 조회
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

    useEffect(() => {
        if (selectedCountry !== "") {
            setCategory('country');
            const selectedCountryInfo = countryInfo.find(country => country.countryName === selectedCountry);
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

    useEffect(() => {
        if (selectedLanguage !== "") {
            setCategory('language');
            const selectedLanguageInfo = languageInfo.find(language => language.languageEng === selectedLanguage);
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
            const filteredMembers = result.response.filter((member) => member.memberType.memberTypeId === 2);

            setMembers([
                ...filteredMembers
            ]);
        }
    };


    const buttonClickHandler = (e) => {
        e.preventDefault();

        setCategory('all');
        setKeyword(inputs.id);
    }

    useEffect(() => {
        handleFindMembers(category, keyword);
    }, [category, keyword]);

    // 디테일
    const [selectedStudent, setSelectedStudent] = useState(
        []);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleCardItemClick = (student) => {
        setSelectedStudent(student)

        if (!selectedStudent || student === selectedStudent) {
            setIsDetailOpen(!isDetailOpen);
        } else if (student !== selectedStudent && !isDetailOpen) {
            setIsDetailOpen(!isDetailOpen)
        }
    };

    console.log(selectedStudent)

    return (
        <>
            <S.PageHeader>
                <h1>TALKIDS</h1>
            </S.PageHeader>
            <main>
                <S.SearchSection>
                    <S.DropboxFieldset>
                        <DropBox1 props={{ list: categoryList, target: selectedCategory, callback: setSelectedCategory }} />
                    </S.DropboxFieldset>
                    {selectedCategory === 'ID' && (
                        <S.InputSection>
                            <LongInput1
                                props={{
                                    id: 'id',
                                    desc: '검색',
                                    color: 'orange',
                                    placeholder: '내용을 입력하세요',
                                    type: 'text',
                                    value: inputs.id,
                                    callback: onChangeHandler,
                                }}
                            />
                            <LongButton1 props={{ color: "green", text: "검색", callback: buttonClickHandler }} />
                        </S.InputSection>
                    )}
                    {selectedCategory === '국가' &&
                        <S.DropboxFieldset>
                            <DropBox1
                                props={{
                                    list: countryList,
                                    target: selectedCountry,
                                    callback: setSelectedCountry,
                                }}
                            />
                        </S.DropboxFieldset>
                    }
                    {selectedCategory === '언어' &&
                        <S.DropboxFieldset>
                            <DropBox1
                                props={{
                                    list: languageList,
                                    target: selectedLanguage,
                                    callback: setSelectedLanguage,
                                }}
                            />
                        </S.DropboxFieldset>
                    }
                </S.SearchSection>
                <S.MatchSection isDetailOpen={isDetailOpen}>
                    <S.CardList isDetailOpen={isDetailOpen}>
                        {members.map((student, index) => (
                            <S.CardItem key={index} onClick={() => handleCardItemClick(student)}>
                                <Card props={{ studentName: student.memberName, country: student.country.countryName, language: student.language.languageEng }} ></Card>
                            </S.CardItem>
                        ))}
                    </S.CardList>
                    <S.DetailSection isDetailOpen={isDetailOpen}>
                        <S.DetailHeader>
                            <img src="https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg" alt="" />
                            <S.NameSection>
                                <p>{selectedStudent.memberName}</p>
                                <S.ButtonWrapper>
                                    <LongButton1 props={{ color: "blue", text: "Message", callback: buttonClickHandler }} />
                                    <LongButton1 props={{ color: "orange", text: "follow", callback: buttonClickHandler }} />
                                </S.ButtonWrapper>
                            </S.NameSection>
                        </S.DetailHeader>
                        <S.DetailBody>
                            {selectedStudent && selectedStudent.country && (
                                <p>{selectedStudent.country.countryName}</p>
                            )}
                            {selectedStudent && selectedStudent.language && (
                                <p>{selectedStudent.language.languageEng}</p>
                            )}
                            <S.IntroductionSection>
                                <p>{selectedStudent.memberIntroduce}</p>
                            </S.IntroductionSection>
                        </S.DetailBody>
                    </S.DetailSection>
                </S.MatchSection>
            </main>
            <footer></footer>
        </>
    )
}
