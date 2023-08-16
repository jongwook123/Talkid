import * as S from './style';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function Card({ props: { studentName, badWords, monthExp, totalExp } }) {
    const entireDealtValue = totalExp;
    const monthDealtValue = monthExp;

    return (
        <S.CardSection>
            <S.TextContainer>
                <h2>{studentName}</h2>
                <S.ProgressWrapper>
                    <S.Progress>
                        <S.Dealt dealt={entireDealtValue} color="green" />
                    </S.Progress>
                    <S.Progress>
                        <S.Dealt dealt={monthDealtValue} color="blue" />
                    </S.Progress>
                </S.ProgressWrapper>
                <h3>{badWords}</h3>
                <PersonRemoveIcon />
            </S.TextContainer>
        </S.CardSection>
    )
}



export default Card
