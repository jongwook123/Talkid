import * as S from './style';

export default function ChatPageSearch({ props: { id, placeholder, onChangeInput, input } }) {
    return (
        <S.UserForm>
            <label htmlFor="userInput">대화 검색</label>
            <S.UserInput id={id} placeholder={placeholder} onChange={onChangeInput} value={input} />
        </S.UserForm>
    )
}
