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
  z-index: 1; //위치지정 요소
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
  height: 500px;
  background-color: #ffffff;
  padding:50px;
    >div.desc {
      margin: 50px;
      font-size: 20px;
      color: var(--coz-purple-600);
    }
`;

export const InputSection = styled.section`
    display: grid;
    grid-template-columns: 4fr 1fr;
`

export const GroupApplySection = styled.section`
    position: absolute;
    width: 620px;
    padding: 70px 50px 90px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid ${props => props.theme.colors.theme.green_light};
    border-radius: ${props => props.theme.border_radius.lv2};
`

export const GroupApplySectionHeader = styled.header`
    width: fit-content;
    position: absolute;
    padding: 0 20px;
    top: 0;
    left: 50%;
    transform: translate(-50%, calc(-50% - 4px));
    background-color: ${props => props.theme.colors.background_color.white};

    & > h2 {
        ${IROnly}
    }

    & > img {
        width: 400px;
        display: block;
        margin: 0 auto;
    }
`

export const GroupApplyForm = styled.form`
    display: flex;
    flex-direction: column;
    
    & > fieldset + fieldset {
        margin-top: 30px;
    }
`

export const ButtonWrapper = styled.div`
    display: grid;
    /* grid-template-columns: 3fr 1fr; */
    position: absolute;
    width: 100%;
    padding: 50px;
    bottom: 0;
    left: 60%;
    transform: translate(-50%);
    & > button {
      width:75%;
    }
`

export const GroupList = styled.div`
    display: flex;
    flex-direction: column;
    border: 3px solid ${props => props.theme.colors.theme.green_light};
    margin-top: 20px;
    border-radius: 10px;
    height: 250px;
    overflow-y : scroll;

    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.background_color.light_gray};
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.colors.background_color.gray};
    }

    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.background_color.white};
        border-radius: 10px;
    }
`

export const Group = styled.span`
  font-size: 20px;
  margin-top: 10px;
  margin-left: 13px;
  margin-right: 13px;
  padding: 5px 10px;
  border-radius: ${props => props.theme.border_radius.lv1};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 90%;

  &:hover {
    background-color: ${props => props.theme.colors.theme.green_light};
    color: white;
    font-weight: bold;
  }

  /* 선택된 그룹에 대한 스타일 */
  background-color: ${props => props.isSelected ? props.theme.colors.theme.green_light : 'initial'};
  color: ${props => props.isSelected ? 'white' : 'initial'};
  font-weight: ${props => props.isSelected ? 'bold' : 'initial'};
`;




