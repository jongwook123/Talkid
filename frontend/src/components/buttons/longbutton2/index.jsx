import * as S from './style';

const colors = ['orange', 'green', 'blue'];

export default function LongButton2({ props: { text, callback } }) {
    const color = colors[Math.floor(Math.random() * 3)];
    
    return (
        <S.Button color={color} onClick={callback}>{text}</S.Button>
    )
}