import styled from "styled-components";
import IROnly from "styles/IROnly";

export const FieldSet = styled.fieldset`
    width: 100%;
    display: flex;
    flex-direction: column;

    & > legend {
        ${IROnly}
    }
`

export const Label = styled.label`
    width: 100%;
    margin-bottom: 8px;
    color: ${props => props.theme.colors.font.light_black};
    font-size: ${props => props.theme.font_size.lv3};
`

export const Input = styled.input`
    width: 100%;
    display: block;
    height: 32px;
    padding: 0 8px;
    border: 2px solid ${props => props.theme.colors.border.light_gray};
    font-size: ${props => props.theme.font_size.lv3};

    &:focus {
        outline: 0;
        border: 2px solid ${(props) => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
    }
`