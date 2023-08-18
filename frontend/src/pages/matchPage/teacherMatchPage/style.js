import styled from "styled-components";

export const MatchSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const CalendarSection = styled.section`
  margin-left: 100px;
  margin-top: 100px;
`;
export const ListSection = styled.section`
  border: 3px solid ${(props) => props.theme.colors.theme.green_light};
  border-radius: ${(props) => props.theme.border_radius.lv2};
  padding: 15px;
  max-width: 400px;
  max-height: 500px;
  margin: 200px 0px 0px 50px;
  height: 60%;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const Label = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  margin-left: 25px;
  margin-right: 5px;
`;
