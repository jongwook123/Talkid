import styled from 'styled-components';


export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : center;
  align-items : center;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
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
        height: 50%;
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
  height: 400px;
  background-color: #ffffff;
  padding:50px;
    >div.desc {
      margin: 50px;
      font-size: 20px;
      color: var(--coz-purple-600);
    }
`;

export const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    position: absolute;
    width: 100%;
    padding: 50px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    & > button {
      width:95%;
    }
`

export const  ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 10px;
`;

export const ModalMessage = styled.p`
  margin: 0 0 20px;
`;

export const ModalButton = styled.button`
  background-color: #8EA3BC;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const DropboxFieldset = styled.fieldset`
    width: 100%;
`
