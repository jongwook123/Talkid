import styled from "styled-components"
import IROnly from "styles/IROnly"

export const UserForm = styled.form`
    width: 100%;
    height: 48px;
    padding: 10px;
    border-bottom: 1px solid ${props => props.light ? 'none' : props.theme.colors.theme.blue_dark};

    & > label {
        ${IROnly}
    }
`

export const UserInput = styled.input`
    width: 100%;
    border: none;
    padding: 6px 15px;
    background-color: ${props => props.light ? props.theme.colors.theme.blue : props.theme.colors.theme.blue_dark};
    border-radius: ${props => props.theme.border_radius.lv1};
    color: ${props => props.theme.colors.font.white};

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${props => props.theme.colors.font.white};
    }
`