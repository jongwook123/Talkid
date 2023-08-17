import styled from "styled-components";

export const CardSection = styled.section`
  width: 300px;
  overflow-x: hidden;
  padding: 10%;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => props.theme.border_radius.lv2};
  font-size: ${(props) => props.theme.font_size.lv4};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  & > img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 60%;
  }
`;
export const TextContainer = styled.div`
  margin: 10px;
  & > h2 {
    font-size: ${(props) => props.theme.font_size.lv5};
    font-weight: 700;
  }

  & > h3 {
    text-align: right;
    font-size: ${(props) => props.theme.font_size.lv3};
    margin-top:50px;

    & > svg {
      vertical-align: middle;
      margin-right: 5px;
    }
  }
`;

export const Progress = styled.div`
  width: 100%;
  height: 20px;
  background-color: gray;
  border-radius: 5px;
  margin: 20px 0 20px 0;
`;

export const Dealt = styled.div`
  background-color: ${(props) => props.theme.colors.theme.blue};
  width: ${(props) => props.dealt + "%"};
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
