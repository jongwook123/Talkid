import styled from "styled-components";

export const MatchSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const CalendarSection = styled.section`
  margin:100px;
`;
export const ListSection = styled.section`
  border: 3px solid ${props => props.theme.colors.theme.green_light};
  border-radius: ${props => props.theme.border_radius.lv2};
  padding:40px;
  margin: 100px 100px 100px 0;
  height: 60%;
`;