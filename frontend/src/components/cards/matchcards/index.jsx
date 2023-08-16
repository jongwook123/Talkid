import * as S from './style';

import AccountBoxIcon from '@mui/icons-material/AccountBox';

const colors = ['orange', 'green', 'blue'];

function Card({ props: { studentName, email, country, language, selected } }) {
    const color = colors[Math.floor(Math.random() * 3)];

    return (
        <S.CardSection selected={selected} color={color}>
            <AccountBoxIcon />
            <S.Header>
                <h3>{studentName}</h3>
                <p>{email}</p>
            </S.Header>
            <p>from {country},</p>
            <p>using {language}</p>
        </S.CardSection>

    )
}

export default Card
