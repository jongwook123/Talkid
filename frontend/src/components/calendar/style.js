import styled from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateSection = styled.section`
    display:grid;
    width: 100%;
    grid-template-columns: 6fr 1fr 5fr;
    align-items: center;
    margin-top: 30px;

`

export const DateBox1 = styled.div`

`

export const DateBox2 = styled.div`

`

export const StyledDatePicker = styled(DatePicker)`
  display: flex;
  align-items: center;
  border: 1px solid colors.$GRAY6;
  border-radius: 4px;
  background-color: colors.$BG_COLOR;
  box-sizing: border-box;
  width: 100%;
  height: 46px;
  color: colors.$WHITE;
  text-align: center;
  padding-right: 14px;

  &:focus {
    border: 2px solid colors.$ORANGE;
  }
`;
