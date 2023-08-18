import { Link } from "react-router-dom";
import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Header = styled.header`
    width: 100vw;
    height: 80px;
    padding: 0 36px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    justify-content: space-between;
    z-index: 2000;
    box-shadow: 0 0 22px -10px ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};;

    & > h1 {
        width: 200px;
    }

    & > h1 > a > img {
        width: 100%;
    }
`

export const HeaderNav = styled.nav`
    
`

export const NavList = styled.ul`
    display: flex;
    align-items: center;
    gap: 15px;
`

export const NavListItem = styled.li`
    display: ${props => props.visible ? "block" : "none"};
    position: relative;
`

export const NavLink = styled(Link)`
    border: none;
    background-color: inherit;
    color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
`

export const NavButton = styled.button`
    border: none;
    background-color: inherit;
    position: relative;
    color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};

    &:focus {
        outline: none;
    }

    & > svg:nth-child(2) {
        display: ${props => props.visible ? 'block' : 'none'};
        width: 10px;
        height: 10px;
        position: absolute;
        bottom: -5px;
        right: -5px;
        color: red;
    }
`

export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2000;
    background-color: ${props => props.theme.colors.background_color.modal_wrapper};
    display: ${props => props.visible ? "block" : "none"};
`

export const AlarmModal = styled.section`
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background_color.white};
    border-radius: ${props => props.theme.border_radius.lv4};
`

export const AlarmModalHeader = styled.h2`
    font-family: 'Righteous', sans-serif;
    text-align: center;
    font-size: ${props => props.theme.font_size.lv5};
    color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
`

export const AlarmModalList = styled.ul`
    margin: 35px 0;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    max-height: 200px;
    overflow-y: scroll;
    gap: 5px;

    & > li {
        width: 100%;
        position: relative;
    }

    &::-webkit-scrollbar {
        width: 8px;
        background-color: ${props => props.theme.colors.background_color.white};
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};
        border-radius: 10px;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
`

export const AlarmListButton = styled.button`
    width: 100%;
    height: 48px;
    padding: 0 12px;
    border: none;
    font-size: ${props => props.theme.font_size.lv3};
    color: ${props => props.theme.colors.font.white};
    background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};

    &:focus {
        outline: none;
    }
`

export const AlarmModalButton = styled.button`
    border: none;
    padding: 6px 25px;
    margin-left: auto;
    background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
    color: ${props => props.theme.colors.font.white};
    font-size: ${props => props.theme.font_size.lv3_1};
    border-radius: ${props => props.theme.border_radius.lv2};

    &:focus {
        outline: none;
    }
`

export const FollowModal = styled.section`
    width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${props => props.theme.colors.background_color.white};
    border-radius: ${props => props.theme.border_radius.lv4};

    & > h2 {
        ${IROnly}
    }
`

export const FollowTabWrapper = styled.div`
    display: flex;
`

export const FollowTabButton = styled.button`
    width: 100%;
    font-family: 'Righteous', sans-serif;
    text-align: center;
    border: none;
    padding: 8px 0;
    transition: all 0.3s;
    background-color: ${props => !props.selected ? props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}` : 'inherit'};
    color: ${props => props.selected ? props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}` : props.theme.colors.font.white};
    font-size: ${props => props.theme.font_size.lv5};

    &:focus {
        outline: none;
    }
`

export const FollowListWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-grow: 1;
`

export const FollowList = styled.ul`
    width: 100%;
    display: ${props => props.selected ? 'flex' : 'none' };
    flex-direction: column;
    padding: 30px;
`

export const FollowListItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px;

    & > button:nth-child(2) {
        margin-left: auto;
    }

    & > button:nth-child(3) {
        margin-left: 12px;
    }
`

export const BookmarkModal = styled.section`
    width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background_color.white};
    border-radius: ${props => props.theme.border_radius.lv4};
`

export const BookmarkModalHeader = styled.h2`
    font-family: 'Righteous', sans-serif;
    text-align: center;
    font-size: ${props => props.theme.font_size.lv5};
    color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
`

export const BookmarkModalList = styled.ul`
    margin: 35px 0;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    max-height: 200px;
    overflow-y: scroll;
    gap: 5px;

    &::-webkit-scrollbar {
        width: 8px;
        background-color: ${props => props.theme.colors.background_color.white};
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};
        border-radius: 10px;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
`

export const BookmarkListItem = styled.li`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
`

export const BookmarkTextWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;

    & > p {
        font-size: ${props => props.theme.font_size.lv3};
        color: ${props => props.theme.colors.font.light_black};
    }
`

export const BookmarkListButton = styled.button`
    width: 80px;
    height: 48px;
    padding: 0 12px;
    border: none;
    font-size: ${props => props.theme.font_size.lv3};
    color: ${props => props.theme.colors.font.white};
    background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
    border-radius: ${props => props.theme.border_radius.lv2};

    &:focus {
        outline: none;
    }
`

export const BookmarkModalButton = styled.button`
    border: none;
    padding: 6px 25px;
    margin-left: auto;
    background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};
    color: ${props => props.theme.colors.font.white};
    font-size: ${props => props.theme.font_size.lv3_1};
    border-radius: ${props => props.theme.border_radius.lv2};

    &:focus {
        outline: none;
    }
`

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    & > p:first-child {
        font-size: ${props => props.theme.font_size.lv4};
        color: ${props => props.theme.colors.font.light_black};
    }

    & > p:last-child {
        font-size: ${props => props.theme.font_size.lv3};
        color: ${props => props.theme.colors.font.light_gray};
    }
`

export const UnfollowButton = styled.button`
    border: none;
    padding: 6px 12px;
    border-radius: ${props => props.theme.border_radius.lv2};
    color: ${props => props.theme.colors.font.white};
    font-size: ${props => props.theme.font_size.lv2};
    background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};

    &:focus {
        outline: none;
    }
`

export const ChatButton = styled.button`
    background-color: inherit;
    border: none;
    color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange_dark}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};

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