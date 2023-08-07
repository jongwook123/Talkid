import styled from "styled-components";
import IROnly from "styles/IROnly";

export const SectionChat = styled.section`
    height: 100vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background_color.white};
`

export const HeaderChat = styled.header`
    width: 100%;
    height: 48px;
    display: flex;
    background-color: ${props => props.theme.colors.background_color.white};
    border-bottom: 1px solid ${props => props.theme.colors.theme.blue};

    & > h2 {
        display: block;
        line-height: 48px;
        padding-left: 20px;
        font-size: ${props => props.theme.font_size.lv4};
    }
`

export const ListChat = styled.ul`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 30px;
    padding-bottom: 0;
`

export const FormChat = styled.form`
    display: flex;
    margin: 30px;
    padding: 10px 20px;
    background-color: ${props => props.theme.colors.theme.orange};
    border-radius: ${props => props.theme.border_radius.lv3};

    & > label {
        ${IROnly}
    }
`

export const FormInput = styled.input`
    flex-grow: 1;
    border: none;
    font-size: ${props => props.theme.font_size.lv3_1};
    background-color: inherit;
    color: ${props => props.theme.colors.font.white};

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${props => props.theme.colors.font.white};
    }
`

export const FormButton = styled.button`
    border: none;
    padding: 6px 10px;
    background-color: ${props => props.theme.colors.theme.green_dark};
    border-radius: ${props => props.theme.border_radius.lv2};
    color: ${props => props.theme.colors.font.white};
`