import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
`

export const Button = styled.button`
    width: 100%;
    height: 32px;
    text-align: left;
    padding: 0 12px;
    position: relative;
    background-color: ${props => props.theme.colors.background_color.white};
    font-size: ${props => props.theme.font_size.lv3};
    border: 2px solid ${(props) => props.clicked ? props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}` : `${props.theme.colors.border.light_gray}`};
    border-bottom: ${props => props.clicked ? "none" : ""};
    padding-bottom: ${props => props.clicked ? "2px" : ""};
    border-radius: ${props => props.clicked ? `${props.theme.border_radius.lv2} ${props.theme.border_radius.lv2} 0 0` : props.theme.border_radius.lv2};
    color: ${props => props.theme.colors.font.light_black};

    &::before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        right: 14px;
        top: 8px;
        transition: all 0.2s;
        transform: ${props => props.clicked ? "translate(5px, -1px) rotate(225deg);" : "translate(0, -1px) rotate(225deg)" };
        border-top: 2px solid ${(props) => props.clicked ? props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green_dark}` : `${props.theme.colors.theme.blue_dark}` : `${props.theme.colors.border.light_black2}`};
    }

    &::after {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        right: 15px;
        top: 8px;
        transition: all 0.2s;
        transform: ${props => props.clicked ? "translate(-3px, -1px) rotate(135deg);" : "translate(1px, -1px) rotate(135deg)" };
        border-top: 2px solid ${(props) => props.clicked ? props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green_dark}` : `${props.theme.colors.theme.blue_dark}` : `${props.theme.colors.border.light_black2}`};
    }
`

export const Content = styled.p`
    padding: 8px 12px;
    margin-top: -1px;
    font-family: 'Righteous', sans-serif;
    display: ${props => props.clicked ? "block" : "none"};
    border-radius: ${props => `0 0 ${props.theme.border_radius.lv2} ${props.theme.border_radius.lv2}`};
    border: 2px solid ${(props) => props.clicked ? props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}` : `${props.theme.colors.border.light_gray}`};
    border-top: none;
    color: ${props => props.theme.colors.font.light_black};
    font-size: ${props => props.theme.font_size.lv3};
`