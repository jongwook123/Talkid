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
  z-index: 2000;
  background-color: rgba(0,0,0,0.4);
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
  height: 400px;
  background-color: #ffffff;
  padding:50px;
    >div.desc {
      margin: 50px;
      font-size: 20px;
      color: var(--coz-purple-600);
    }
`;

export const StyledImageFieldset = styled.fieldset`
    width: 100%;
    margin-top: 0 !important;
    display: ${props => props.visible ? "block" : "none"};

    & > legend {
        ${IROnly}
    }
`

export const ImagePreview = styled.div`
    @keyframes ImagePreview_construct {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    animation: ImagePreview_construct 0.5s;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export const ImagePreviewIconWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    margin: 5px;
    background-color: ${props => props.theme.colors.background_color.light_gray};
    border-radius: ${props => props.theme.border_radius.circle};

    & > span {
        padding-bottom: 5px;
        color: ${props => props.theme.colors.font.white};
    }
`

export const StyledImageUploadBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > * {
        width: 100%;
        border-radius: ${props => props.theme.border_radius.lv1};
    }

    & > input {
        display: none;
    }
`

export const StyledImageUploadLabel = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.theme.blue};
    color: white;
    padding: 15px;
    transition: all 0.1s;

    &:hover {
        background-color: ${props => props.theme.colors.theme.blue_dark};
    }

    & i {
        font-size: 32px;
    }
`

export const StyledImageUploadTextBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Righteous', sans-serif;

    & > p {
        width: 100%;
        text-align: center;
        font-size: 14px;
    }
`

export const StyledPreviewWrapper = styled.div`
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #b8b8b8;
    display: ${props => props.exist ? "block" : "none"};
`

export const StyledPreviewContainer = styled.div`
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, 116px);
    row-gap: 10px;

    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
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