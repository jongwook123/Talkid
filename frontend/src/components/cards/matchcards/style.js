import styled from "styled-components";

export const CardSection = styled.section`
    width: 90%;
    height: 64px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: ${props => props.selected ? '15px' : '12px'};
    background-color: ${props => props.selected ? props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}` : "inherit"};
    border: 3px solid ${props => props.selected ? 'none' : props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};
    border-radius: ${props => props.theme.border_radius.lv2};
    color: ${props => props.selected ? props => props.theme.colors.font.white : props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};
        color: ${props => props.theme.colors.font.white};
    }
    
    & > svg {
        width: 40px;
        height: 40px;
        margin-right: 12px;
    }

    & > p {
        font-size: ${props => props.theme.font_size.lv3};
        margin-left: 100px;
    }

    & > p:last-child {
        margin-left: 5px;
    }
`

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 5px;

    & > h3 {
        font-size: ${props => props.theme.font_size.lv4};
    }

    & > p {
        font-size: ${props => props.theme.font_size.lv2};
    }
`