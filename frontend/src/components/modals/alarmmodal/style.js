import styled from "styled-components";
import IROnly from "styles/IROnly";

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  z-index: 100000;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

export const ModalBtn = styled.button`
  background-color: white;
  border: none;
  cursor: grab;
  & > svg {
        color: ${props => props.theme.colors.theme.blue};
        width: 30%;
        height: 100%;
        &:hover {
        transform: scale(1.05);
      }
    }
`;

export const ExitBtn = styled(ModalBtn)`
  background-color: ${(props) => props.theme.colors.theme.orange_dark};
  color:white;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  display : flex;
  justify-content: center;
  align-items : center;
`;

export const ModalView = styled.dialog`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  border: 3px solid;
  border-color: ${(props) => props.theme.colors.theme.green};
  width: 500px;
  height: 200px;
  background-color: #ffffff;
  padding:50px;
    >div.desc {
      margin: 50px;
      font-size: 20px;
      color: var(--coz-purple-600);
    }
    & > p {
      font-size: 25px;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    position: absolute;
    width: 50%;
    /* padding: 50px; */
    padding-bottom : 30px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    & > button {
      width:75%;
      margin: 5px;
    }
`



