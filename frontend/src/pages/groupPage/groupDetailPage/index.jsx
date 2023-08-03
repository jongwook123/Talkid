import * as S from './style';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import Card from "components/cards/studentcards";

export default function GroupDetailPage() {

    const dummyStudentList = [
        {
            "student_name": "studentName",
            "bad_words": 30,
        },
        {
            "student_name": "Name",
            "students": 21,
            "created_date": '2023-08-01',
        },
        {
            "student_name": "Name",
            "students": 14,
            "created_date": '2023-08-01',
        },
        {
            "student_name": "Name",
            "students": 53,
            "created_date": '2023-08-01',
        },
        {
            "student_name": "Name",
            "students": 25,
            "created_date": '2023-08-01',
        },
        {
            "student_name": "Name",
            "students": 466,
            "created_date": '2023-08-01',
        },
    ]

    return (
        <>
            <S.PageHeader>
                <h1>TALKIDS</h1>
            </S.PageHeader>
            <main>
                <S.CardSection>
                    <S.CardHeader >
                        <S.CardHeaderText>
                            <p>STUDENT</p>
                            <p>EXP</p>
                            <p>BAD WORDS</p>
                        </S.CardHeaderText>
                        <PersonAddAlt1Icon />
                    </S.CardHeader>
                    <S.CardList>
                        {dummyStudentList.map((student, index) => (
                            <S.CardItem key={index}>
                                <Card props={{ studentName: student.student_name, badWords: student.bad_words }}></Card>
                            </S.CardItem>
                        ))}
                    </S.CardList>
                </S.CardSection>
            </main>
            <footer></footer>
        </>
    )
}
