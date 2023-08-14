import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.header`
    width: 100vw;
    height: 80px;
    padding: 0 36px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    justify-content: space-between;
    box-shadow: 0 0 22px -10px ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};;

    & > h3 {
        width: 200px;
    }

    & > h3 > a > img {
        width: 100%;
    }
`

export const HeaderNav = styled.nav`
    
`

export const NavList = styled.ul`
    display: flex;
    align-items: center;
    gap: 15px;

    & > li {
        position: relative;
    }
`

export const NavListItem = styled.li`
    display: ${props => props.visible ? "block" : "none"};
`

export const NavLink = styled(Link)`
    border: none;
    background-color: inherit;
    color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
`

export const NavButton = styled.button`
    border: none;
    background-color: inherit;
    color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};

    &:focus {
        outline: none;
    }
`

export const ButtonList = styled.ul`
    width: 160px;
    position: absolute;
    top: 35px;
    right: -20px;
    padding: 8px 0;
    background-color: ${props => props.theme.colors.background_color.white};
    border: 1px solid ${props => props.theme.colors.border.light_gray};
    display: ${props => props.visible ? 'block' : 'none'};
    border-radius: ${props => props.theme.border_radius.lv2};

    &::after {
        content: "";
        display: block;
        width: 14px;
        height: 14px;
        position: absolute;
        top: -7px;
        right: 24px;
        transform: rotate(45deg);
        border-left: 1px solid ${props => props.theme.colors.border.light_gray};
        border-top: 1px solid ${props => props.theme.colors.border.light_gray};
        background-color: ${props => props.theme.colors.background_color.white};
    }

    & > li {
        width: 100%;
    }
`

export const ButtinListLink = styled(Link)`
    width: 100%;
    padding: 8px 15px;
    border: none;
    text-align: left;
    background-color: inherit;
    display: flex;
    align-items: center;
    font-family: 'Righteous', sans-serif;
    font-size: ${props => props.theme.font_size.lv3};

    &:hover {
        background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_light}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};;
    }

    & > svg {
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }
`

export const ButtinListButton = styled.button`
    width: 100%;
    padding: 8px 15px;
    border: none;
    text-align: left;
    background-color: inherit;
    display: flex;
    align-items: center;
    font-family: 'Righteous', sans-serif;
    font-size: ${props => props.theme.font_size.lv3};

    &:hover {
        background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_light}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};;
    }

    & > svg {
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }
`