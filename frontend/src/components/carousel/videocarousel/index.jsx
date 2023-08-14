import { useState } from 'react';

import * as S from './style';
import { useCallback } from 'react';

export default function VideoCarousel({ props: { list } }) {
    const [index, setIndex] = useState(0);

    const leftClick = useCallback((e) => {
        if (index === 0) {
            return;
        }

        setIndex(i => i - 1);
    }, [index]);

    const rightClick = useCallback((e) => {
        if (index === list.length - 1) {
            return;
        }

        setIndex(i => i + 1);
    }, [index, list]);

    return (
        <S.CaruoselWrapper>
            <S.VideoList margin={(-270 * index) + "px"}>
                {
                    list.map(video => video)
                }
            </S.VideoList>
            <S.LeftButton onClick={leftClick}>
                <span>왼쪽으로 이동</span>
                <p>{"<"}</p>
            </S.LeftButton>
            <S.RightButton onClick={rightClick}>
                <span>오른쪽으로 이동</span>
                <p>{">"}</p>
            </S.RightButton>
        </S.CaruoselWrapper>
    )
}
