import { useState } from 'react';
import * as S from './style';

export default function DropBox2({ props: { title, content, color } }) {
    const [clicked, setClicked] = useState(false);

    // 드랍 다운 버튼 클릭
    const onClickButton = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setClicked(!clicked);
    }

    const onClickContent = (e) => {
        e.stopPropagation();
        setClicked(false);
    }

    return (
        <S.Wrapper>
            <S.Button clicked={clicked} onClick={onClickButton} color={color}>
                <span>{title}</span>
            </S.Button>
            <S.Content clicked={clicked} color={color} onClick={onClickContent}>{content}</S.Content>
        </S.Wrapper>
    )
}
