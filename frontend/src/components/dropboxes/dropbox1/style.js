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
    border-radius: ${props => props.theme.border_radius.lv2};
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
        transform: ${props => props.clicked ? "translate(-4px, -1px) rotate(135deg);" : "translate(0, -1px) rotate(135deg)" };
        border-top: 2px solid ${(props) => props.clicked ? props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green_dark}` : `${props.theme.colors.theme.blue_dark}` : `${props.theme.colors.border.light_black2}`};
    }
`

export const List = styled.ul`
    width: 100%;
    max-height: 200px;
    background-color: aqua;
    position: absolute;
    top: 37px;
    padding: 4px 0;
    box-shadow: 0 0 5px 1px ${props => props.theme.colors.box_shadow.gray};;
    border-radius: ${props => props.theme.border_radius.lv1};
    background-color: ${props => props.theme.colors.background_color.white};
    display: ${props => props.clicked ? "block" : "none"};
`

export const ListItem = styled.li`
    width: 100%;
`

export const ListButton = styled.button`
    width: 100%;
    border: 0;
    padding: 5px 16px;
    text-align: left;
    font-size: ${props => props.theme.font_size.lv3};
    background-color: ${props => props.theme.colors.background_color.white};

    &:hover {
        background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_light}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};
        color: ${props => props.theme.colors.font.white};
    }
`