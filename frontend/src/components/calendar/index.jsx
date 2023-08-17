
import { setHours, setMinutes } from 'date-fns';
import * as S from './style';

import ScheduleIcon from '@mui/icons-material/Schedule';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

function Calendar({ selectedMeetingStart, setSelectedMeetingStart, selectedMeetingEnd, setSelectedMeetingEnd }) {

    const handleMeetingStartChange = (date) => {
        setSelectedMeetingStart(date);
    };

    const handleMeetingEndChange = (date) => {
        setSelectedMeetingEnd(date);
    };

    return (
        <S.DateSection>
            <S.DateBox1>
                <ScheduleIcon />
                <S.StyledDatePicker
                    selected={selectedMeetingStart}
                    onChange={handleMeetingStartChange}
                    showTimeSelect
                    minTime={setHours(setMinutes(new Date(), 0), 0)}
                    maxTime={setHours(setMinutes(new Date(), 30), 24)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </S.DateBox1>
            <HorizontalRuleIcon />
            <S.DateBox2>
                <S.StyledDatePicker
                    selected={selectedMeetingEnd}
                    onChange={handleMeetingEndChange}
                    showTimeSelect
                    minTime={setHours(setMinutes(new Date(), 0), 0)}
                    maxTime={setHours(setMinutes(new Date(), 30), 24)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </S.DateBox2>

        </S.DateSection>
    );
}



export default Calendar