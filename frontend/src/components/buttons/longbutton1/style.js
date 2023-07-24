import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    border: 0;
    transition: all 0.2s;
    background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
    color: ${props => props.theme.colors.font.white};
    font-size: ${props => props.theme.font_size.lv3};

    &:hover {
        background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green_dark}` : `${props.theme.colors.theme.blue_dark}`};
    }
`