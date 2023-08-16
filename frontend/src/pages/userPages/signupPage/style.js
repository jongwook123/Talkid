import styled from "styled-components";
import IROnly from "styles/IROnly";

export const PageHeader = styled.header`
    & > h1 {
        ${IROnly}
    }
`

export const PageMain = styled.main`
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SectionWrapper = styled.div`
    padding: 100px 0;
    margin: auto 0;
`

export const SigninSection = styled.section`
    width: 620px;
    padding: 70px 50px 90px;
    position: relative;
    height: fit-content;
    border: 8px solid ${props => props.theme.colors.theme.green_light};
    border-radius: ${props => props.theme.border_radius.lv2};
`

export const SigninSectionHeader = styled.header`
    width: fit-content;
    position: absolute;
    padding: 0 20px;
    top: 0;
    left: 50%;
    transform: translate(-50%, calc(-50% - 4px));
    background-color: ${props => props.theme.colors.background_color.white};

    & > a > h2 {
        ${IROnly}
    }

    & > a > img {
        width: 400px;
        display: block;
        margin: 0 auto;
    }
`

export const SigninForm = styled.form`
    display: flex;
    flex-direction: column;
    
    & > fieldset + fieldset {
        margin-top: 30px;
    }
`

export const RadioFieldset = styled.fieldset`
    display: flex;
    align-items: center;
    padding-top: 10px;
    margin-bottom: 10px;

    & > legend {
        ${IROnly}
    }

    & > label {
        font-family: 'Righteous', sans-serif;
    }

    & > label:nth-child(3) {
        margin-right: 10px;
    } 

    & > input[type="radio"] {
        display: flex;
        justify-content: center;
        align-items: center;
        appearance: none;
        background-color: white;
        font: inherit;
        color: currentColor;
        width: 17px;
        height: 17px;
        border: 2px solid #eee;
        border-radius: 50%;
        cursor: pointer;
    }

    & > input[type="radio"]:hover {
        border: 1px solid ${(props) => props.theme.colors.theme.orange};
    }

    & > input[type="radio"]:checked {
        border: 5px solid ${(props) => props.theme.colors.theme.orange};
    }

    & > input[type="radio"]:disabled {
        background-color: #f3f3f3;
    }

    & > input[type="radio"]:disabled:hover {
        border: none;
    }
`

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

export const DropboxFieldset = styled.fieldset`
    & > p {
        font-weight: 700;
        margin-bottom: 10px;
        margin-left: 5px;
        color: ${props => props.theme.colors.font.light_black};
        font-size: ${props => props.theme.font_size.lv3_1};
    }
`

export const ButtonWrapper = styled.div`
    position: absolute;
    width: 520px;
    padding: 0 15px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, calc(50% + 4px));
    background-color: ${props => props.theme.colors.background_color.white};
`