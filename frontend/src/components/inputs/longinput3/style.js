import styled from "styled-components";
import IROnly from "styles/IROnly";

export const FieldSet = styled.fieldset`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    & > legend {
        ${IROnly}
    }

    & > label {
        ${IROnly}
    }

    &:focus-within > label {
        top: 0;
        left: 10px;
        color: ${(props) => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green_dark}` : `${props.theme.colors.theme.blue_dark}`};
        font-size: ${props => props.theme.font_size.lv3};
    }
`

export const Input = styled.input`
    width: 100%;
    display: block;
    height: 32px;
    padding: 0 5px;
    border: 0;
    position: relative;
    border-bottom: 2px solid ${props => props.isFill ? props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}` : props.theme.colors.border.light_gray};
    font-size: ${props => props.theme.font_size.lv3};

    &:focus {
        outline: 0;
        border-bottom: 2px solid ${(props) => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green_dark}` : `${props.theme.colors.theme.blue_dark}`};    
    }

    &::placeholder {
        color: ${props => props.theme.colors.font.light_gray2};
    }

   
`