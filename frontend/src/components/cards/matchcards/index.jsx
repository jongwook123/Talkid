import * as S from './style';

function Card({ props: { studentName, country, language } }) {

    return (

        <S.CardSection>
            <img src="https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg" alt="" />
            <S.TextContainer>
                <h2>{studentName}</h2>
                <h3>{country}</h3>
                <h3>{language}</h3>
            </S.TextContainer>
        </S.CardSection>

    )
}



export default Card
