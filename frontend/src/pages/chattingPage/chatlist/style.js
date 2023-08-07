import styled from "styled-components"
import IROnly from "styles/IROnly"

export const SectionUser = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: ${props => props.theme.colors.theme.blue};
`

export const UserForm = styled.form`
    width: 100%;
    height: 48px;
    padding: 10px;
    border-bottom: 1px solid ${props => props.theme.colors.theme.blue_dark};

    & > label {
        ${IROnly}
    }
`

export const UserInput = styled.input`
    width: 100%;
    border: none;
    padding: 6px 15px;
    background-color: ${props => props.theme.colors.theme.blue_dark};
    border-radius: ${props => props.theme.border_radius.lv1};
    color: ${props => props.theme.colors.font.white};

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${props => props.theme.colors.font.white};
    }
`

export const UserHeader = styled.header`
    font-family: 'Righteous', sans-serif;
    padding: 20px 0 5px 20px;
    font-size: ${props => props.theme.font_size.lv4};
`

export const UserList = styled.ul`
    width: 240px;
    padding-right: 8px;
    margin-top: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
        width: 8px;
        background-color: ${props => props.theme.colors.theme.blue};
    }

    &:hover {
        padding-right: 0;
    }
    
    &:hover::-webkit-scrollbar {
        display: block;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.theme.blue_dark};
        border-radius: 10px;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
`

export const UserListItem = styled.li`
    width: calc(100% - 8px);
    margin-left: 8px;
`

export const UserButton = styled.button`
    width: 100%;
    padding: 15px 30px 15px 15px;
    border: 0;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.theme.blue};
    border-radius: ${props => props.theme.border_radius.lv2};

    &:hover {
        background-color: ${props => props.theme.colors.theme.blue_light};
    }

    &:focus {
        outline: none;
        background-color: ${props => props.theme.colors.theme.blue_light};
    }

    & > span:nth-child(2) {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props => props.theme.colors.theme.orange_dark};
        border-radius: ${props => props.theme.border_radius.circle};
        color: ${props => props.theme.colors.font.white};
        display: ${props => props.left ? 'block' : 'none'};
        font-size: ${props => props.theme.font_size.lv2};
    }

    & > span:last-child {
        ${IROnly}
    }
`

export const ButtonTextWrapper = styled.div`
    display: flex;
    flex-direction: column;

    & > span:nth-child(1) {
        font-size: ${props => props.theme.font_size.lv3_1};
        margin-bottom: 5px;
    }

    & > span:nth-child(2) {
        color: ${props => props.theme.colors.font.light_black};
        font-size: ${props => props.theme.font_size.lv2};
    }
`