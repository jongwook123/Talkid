import * as S from './style';
import PeopleIcon from '@mui/icons-material/People';
import { useState } from 'react';


function Card({ props: { groupName, created_date, students, img_src } }) {
    const dealtValue = Math.floor((30 / 100) * 100);
    const formattedDate = created_date.substring(0, 10);


    return (
        <S.CardSection>
            <img src="https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg" alt="" />
            <S.TextContainer>
                <h2>{groupName}</h2>
                <S.Progress>
                    <S.Dealt dealt={dealtValue} />
                </S.Progress>
                <h3><PeopleIcon />{students} | {formattedDate}</h3>
            </S.TextContainer>
        </S.CardSection>
    )
}



export default Card
