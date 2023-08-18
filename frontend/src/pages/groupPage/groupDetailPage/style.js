import styled from "styled-components";
import IROnly from "styles/IROnly";

export const PageHeader = styled.header`
  & > h1 {
    ${IROnly}
  }
  margin-bottom: 100px;
`;

export const PageMain = styled.main`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
export const CardSection = styled.section`
  margin: auto;
  width: 70%;
  border: 3px solid;
  border-top: none;
  border-color: ${(props) => props.theme.colors.theme.green};
`;
export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: ${(props) =>
    props.theme.colors.background_color.light_gray};
  & > svg {
    color: ${(props) => props.theme.colors.theme.green};
    height: 100%;
  }
`;

export const CardHeaderText = styled.div`
  width: 95%;
  padding: 20px 0px 30px 70px;
  display: grid;
  grid-template-columns: 1fr 2fr 1.2fr;
  text-align: center;
  color: white;
  font-weight: 700;
`;

export const CardList = styled.ul`
  padding: 30px;
`;

export const CardItem = styled.li`
  margin-bottom: 10px;
  & > svg {
    color: ${(props) => props.theme.colors.theme.blue};
    width: 30%;
  }
  & > section {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  width: 150px;
  margin-left: auto;
  padding-right: 30px;
  padding-bottom: 10px;
`;
