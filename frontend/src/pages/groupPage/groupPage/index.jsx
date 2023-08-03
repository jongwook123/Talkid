// import { useState } from 'react';

import * as S from './style';

import Modal from 'components/modals';
import Card from "components/cards/groupcards";

export default function GroupPage() {
    const dummyGroupList = [
        {
            "group_name": "groupName",
            "students": 12,
            "created_date": '2023-08-01',
        },
        {
            "group_name": "groupName",
            "students": 21,
            "created_date": '2023-08-01',
        },
        {
            "group_name": "groupName",
            "students": 14,
            "created_date": '2023-08-01',
        },
        {
            "group_name": "groupName",
            "students": 53,
            "created_date": '2023-08-01',
        },
        {
            "group_name": "groupName",
            "students": 25,
            "created_date": '2023-08-01',
        },
        {
            "group_name": "groupName",
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

                <S.CardList>
                    {dummyGroupList.map((group, index) => (
                        <S.CardItem key={index}>
                            <Card props={{ groupName: group.group_name, students: group.students, created_date: group.created_date, }}></Card>
                        </S.CardItem>
                    ))}
                    <Modal />
                </S.CardList>
            </main>
            <footer></footer>
        </>
    )
}
