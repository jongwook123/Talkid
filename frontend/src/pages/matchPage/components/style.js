import styled from "styled-components";

export const HeadForm = styled.section`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${props => props.theme.colors.theme.green_light};
`;

export const BodyForm = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const Nav = styled.section`
 display: grid;
 grid-template-columns: 3fr 1fr;
 justify-items: stretch;
 margin:10px;
`;
export const Year = styled.div`
  font-size: 2rem;
  font-weight: 700;
  padding:2%;
`;
export const ButtonWrapper = styled.div`
    display: grid;
    justify-items: center;
    align-items: end;
    grid-template-columns: 1fr 1.5fr 1fr;
    & > button {
        width: 95%;
        height:60%;
    }
`

export const Days = styled.div`
  display: flex;
  margin-bottom: 0.5vw;
  font-weight:700;
`;
export const Day = styled.li`
  width: calc(100% / 7);
  text-align: center;

  :nth-child(1),
  :nth-child(7) {
    color: ${props => props.theme.colors.theme.orange_dark};
  }
`;

export const DatesForm = styled.li`
  position: relative;
  width: calc(100% / 7);
  height: 6vw;
  /* text-align: center; */
  /* border: 1px solid ${props => props.theme.colors.theme.green_light}; */
  font-weight:700;
  :nth-child(7n + 1),
  :nth-child(7n) {
    color: ${props => props.theme.colors.theme.orange_dark};
    /* background-color: ${props => props.theme.colors.background_color.gray}; */
  }
`;

export const DateNum = styled.div`
  padding: 1vw;
  ${(props) => props.idx < props.lastDate && `color: #969696;`};

  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `
    color: #969696;
  `};
`;

export const TodayCSS = styled.span`
  background-color: ${props => props.findToday ? props.theme.colors.theme.blue : "inherit"}; 
  ${(props) =>
    props.findToday &&
    ` position: relative;
    padding: 1px 5px;
    border-radius: 30%;
    font-size: 1.2vw;
    font-weight: 700;
    color: #FFFFFF;
    `}

`;

export const Lists = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const List = styled.span`
  margin-top: 0.3vw;
  padding-left: 0.5vw;
  background-color: #f7ced9;
  border-radius: 5px;
`;

export const ModalForm = styled.div`
  position: absolute;
  width: 15vw;
  height: 10vw;
  border-radius: 10px;
  background-color: #fffae0;
  text-align: left;
  color: black;
  z-index: 999;
`;

export const Header = styled.div`
  padding: 1vw 0 0.5vw 1vw;
  font-weight: 700;
  border-bottom: 2px solid #d3d3d3;
`;

export const ViewDate = styled.div`
  padding: 0.4vw 0 0.3vw 1vw;
  border-bottom: 2px solid #d3d3d3;
`;

export const Events = styled.div``;

export const Contexts = styled.textarea`
  background-color: #fffae0;
  padding: 1vw 0 0 0.5vw;
  width: 100%;
  border: none;
`;
export const RegistBtn = styled.div`
  position: absolute;
  margin: 0.4vw 0.9vw;
  padding: 0.3vw;
  width: 3vw;
  left: 0;
  bottom: 0;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #d3d3d3;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  z-index: 99;
`;

export const Close = styled.div`
  position: absolute;
  margin: 0.4vw 0.9vw;
  padding: 0.3vw;
  width: 3vw;
  right: 0;
  bottom: 0;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #d3d3d3;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  z-index: 999;
`;

export const ScheduleList = styled.ul`
  height: 95%;
  overflow-y: auto; 
  font-weight: 600;
  & > li {
    margin-bottom: 50px;
  }
  & > li > p {
    margin-bottom:10px;
  }
`;