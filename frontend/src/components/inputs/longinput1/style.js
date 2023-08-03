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
        width: fit-content;
        position: absolute;
        font-family: 'Righteous', sans-serif;
        top: ${props => props.isFill ? "0" : "50%"};
        left: ${props => props.isFill ? "10px" : "6px"};
        transform: translate(0, -50%);
        transition: all 0.15s;
        z-index: 200;
        padding: 0 5px;
        background-color: ${props => props.theme.colors.background_color.white};
        color: ${props => props.isFill ? props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green_dark}` : `${props.theme.colors.theme.blue_dark}` : props.theme.colors.font.light_gray};
        font-size: ${props => props.isFill ? props.theme.font_size.lv3 : props.theme.font_size.lv4};
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
    height: 48px;
    padding: 0 15px;
    border: 0;
    position: relative;
    border: 2px solid ${props => props.isFill ? props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}` : "0"};
    border-bottom: 2px solid ${props => props.isFill ? props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}` : props.theme.colors.border.light_gray};
    font-size: ${props => props.theme.font_size.lv4};
    border-radius: ${props => props.isFill ? props.theme.border_radius.lv2 : "0"};

    &:focus {
        outline: 0;
        border: 2px solid ${(props) => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green_dark}` : `${props.theme.colors.theme.blue_dark}`};    
        border-radius: ${props => props.theme.border_radius.lv2};
    }

    &::placeholder {
        color: ${props => props.theme.colors.font.light_gray2};
    }

   
`