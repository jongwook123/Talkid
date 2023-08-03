import * as S from './style';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function Card({ props: { studentName, badWords, img_src } }) {
    const entireDealtValue = Math.floor((60 / 100) * 100);
    const monthDealtValue = Math.floor((30 / 100) * 100);

    return (
        <S.CardSection>
            <img src="https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg" alt="" />
            <S.TextContainer>
                <h2>{studentName}</h2>
                <S.ProgressWrapper>
                    <S.Progress>
                        <S.Dealt dealt={entireDealtValue} color="green"/>
                    </S.Progress>
                    <S.Progress>
                        <S.Dealt dealt={monthDealtValue} color="blue"/>
                    </S.Progress>
                </S.ProgressWrapper>
                <h3>{badWords}</h3>
                <PersonRemoveIcon />
            </S.TextContainer>
        </S.CardSection>
    )
}



export default Card
