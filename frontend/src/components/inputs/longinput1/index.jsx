import * as S from './style';

export default function LongInput1({ props: { id, desc, color, placeholder, type, value, callback } }) {
    return (
        <S.FieldSet color={color} isFill={!!value}>
            <legend>{desc} Insert Field</legend>
            <label htmlFor={id}>{placeholder}</label>
            <S.Input type={type} id={id} name={id} color={color} value={value} onChange={callback} isFill={!!value} autoComplete={type === "password" ? "off" : "on"} />
        </S.FieldSet>
    )
}
