import { useState } from 'react';
import { useSelector } from 'react-redux';

import * as S from './style';

import ChatPageSearch from 'components/searchInput/chatpagesearch';
import LongButton2 from 'components/buttons/longbutton2';

import { GetResult } from 'apis/DictionaryAPIs';

export default function Dictionary({ props: { dictionaryClicked, user } }) {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const token = useSelector(state => state.user.accessToken);

    const onChangeInput = (e) => {
        console.log(e);
        setInput(e.target.value);
    }

    const onClickSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const getResult = async () => {
            const result = await GetResult(token, user.language.languageCode === 'ko' ? '/ko/en/' : '/en/ko/', input);

            setResults(!result.response ? [] : result.response);
        }

        getResult();
    }

    return (
        <S.Section dictionaryClicked={dictionaryClicked}>
            <S.SectionHeader>
                <h3>Dictionary</h3>
                <S.HeaderWarpper>
                    <ChatPageSearch props={{ id: 'dictionaryInput', placeholder: 'insert a word', onChangeInput, input, light: true }} />
                </S.HeaderWarpper>
                <S.HeaderWarpper>
                    <LongButton2 props={{ color: "blue", text: "검색", callback: onClickSearch }} />
                </S.HeaderWarpper>
            </S.SectionHeader>
            <S.ResultWrapper>
                {
                    results.map((result, index) => {
                        return(
                            <li key={"" + result.word + index}>
                                <S.TextWrapper>
                                    <p>{result.word}</p>
                                    <p>{result.partOfSpeech}</p>
                                </S.TextWrapper>
                                <p>{result.definition}</p>
                                <p>{"ex) " + result.example}</p>
                            </li>
                        )
                    })
                }
            </S.ResultWrapper>
        </S.Section>
    )
}
