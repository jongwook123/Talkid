import * as S from './style';

export default function LongButton1({ props: { color, text, callback } }) {
    return (
        <S.Button color={color} onClick={callback}>{text}</S.Button>
    )
}