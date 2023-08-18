import * as S from './style';

export default function ChatPageSearch({ props: { id, placeholder, onChangeInput, input, light } }) {
    return (
        <S.UserForm light={light} onKeyDown={e => {if (e.keyCode === 13) {e.preventDefault();};}}>
            <label htmlFor="userInput">Search Chat</label>
            <S.UserInput id={id} placeholder={placeholder} onChange={onChangeInput} value={input} light={light} />
        </S.UserForm>
    )
}
