import * as S from './style';

const colors = ['orange', 'green', 'blue'];

export default function LongInput3({ props: { id, desc, placeholder, type, value, callback } }) {
    const color = colors[Math.floor(Math.random() * 3)];

    return (
        <S.FieldSet color={color} isFill={!!value}>
            <legend>{desc} insert Field</legend>
            <label htmlFor={id}>{placeholder}</label>
            <S.Input type={type} id={id} name={id} color={color} value={value} onChange={callback} isFill={!!value} placeholder={placeholder} />
        </S.FieldSet>
    )
}
