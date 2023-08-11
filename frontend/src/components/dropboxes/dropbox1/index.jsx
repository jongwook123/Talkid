import { useEffect, useState } from 'react';
import * as S from './style';

const colors = ['orange', 'green', 'blue'];

export default function DropBox1({ props: { list, target, callback } }) {
    const [clicked, setClicked] = useState(false);
    const color = colors[Math.floor(Math.random() * 3)];

    // 드랍 다운 버튼 클릭
    const onClickButton = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setClicked(!clicked);
    }

    // 드랍 박스 이외의 영역을 눌렀을 때
    window.addEventListener("click", () => {
        setClicked(false);
    })

    // 드랍 박스 리스트 버튼 클릭
    const onClickListButton = (e) => {
        e.preventDefault();
        
        callback(e.currentTarget.querySelector('span').innerText);
    }

    // 타겟 값 변경 시
    useEffect(() => {
        setClicked(false);
    }, [target]);

    return (
        <S.Wrapper>
            <S.Button clicked={clicked} onClick={onClickButton} color={color}>
                <span>{target}</span>
            </S.Button>
            <S.List clicked={clicked} color={color} onClick={(e) => {e.stopPropagation();}}>
                {
                    list.map(item => {
                        return (
                            <S.ListItem key={item}>
                                <S.ListButton onClick={onClickListButton} color={color}>
                                    <span>{item}</span>
                                </S.ListButton>
                            </S.ListItem>
                        )
                    })
                }
            </S.List>
        </S.Wrapper>
    )
}
