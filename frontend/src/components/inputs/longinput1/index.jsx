import * as S from './style';

export default function LongInput1({ props: { id, desc, color, placeholder, value, callback } }) {
    return (
        <S.FieldSet>
            <legend>{desc} 입력 영역</legend>
            <S.Label htmlFor={id}>{desc}</S.Label>
            <S.Input type="text" id={id} name={id} placeholder={placeholder} color={color} value={value} onChange={callback} />
        </S.FieldSet>
    )
}