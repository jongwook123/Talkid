import * as S from './style';

function LongInput2({ props: { id, desc, color, placeholder, type, value, callback } }) {
    return (
        <S.FieldSet color={color} isFill={!!value}>
            <legend>{desc} Insert Field</legend>
            <label htmlFor={id}>{placeholder}</label>
            <S.Input2 type={type} id={id} name={id} color={color} value={value} onChange={callback} isFill={!!value} disabled/>
        </S.FieldSet>
    )
    }
    


export default LongInput2