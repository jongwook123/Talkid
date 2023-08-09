import { useState } from 'react';

import * as S from './style';

export default function List() {
    const dummyScheduleList = [
        {
            "id": 1,
            "school_name": "1SSAFYschool",
            "teacher_name": "Lee",
            "date": '2023-08-01',
            "time": '12:30',
        },
        {
            "id": 2,
            "school_name": "2SSAFYschool",
            "teacher_name": "Lee",
            "date": '2023-08-01',
            "time": '12:30',
        },
        {
            "id": 3,
            "school_name": "3SSAFYschool",
            "teacher_name": "Lee",
            "date": '2023-08-01',
            "time": '12:30',
        },
        {
            "id": 4,
            "school_name": "4SSAFYschool",
            "teacher_name": "Lee",
            "date": '2023-08-01',
            "time": '12:30',
        },
    ]

    const [scheduleList, setScheduleList] = useState(dummyScheduleList);
    


    return (
        <S.ScheduleList>
            {dummyScheduleList.map(schedule => (
                <li key={schedule.id}>
                    <p>{schedule.school_name}</p>
                    <p>{schedule.teacher_name}</p>
                    <p>{schedule.time}</p>
                </li>
            ))}
        </S.ScheduleList>
    );
}