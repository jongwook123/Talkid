import styled from "styled-components";
import IROnly from "styles/IROnly";

export const PageMain = styled.main`
    height: calc(100vh - 110px);
    margin-top: 80px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    font-family: 'Righteous', sans-serif;
`

export const SearchSection = styled.section`
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-column-gap: 20px;
    padding: 30px;

    & > header {
        ${IROnly}
    }
`

export const InputSection = styled.div`
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-column-gap: 20px;
`

export const DropboxFieldset = styled.div`
    
`

export const MatchSection = styled.section`
    flex-grow: 1;
    display: flex;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

export const CardList = styled.ul`
    padding: 10px 15px 0 30px;
    overflow-y: scroll;
    transition: width 0.3s ease;
    width: ${props => (props.isDetailOpen ? '60%' : '100%')};

    &::-webkit-scrollbar {
        width: 8px;
        background-color: inherit;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        display: none;
        background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};
        border-radius: 10px;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
`

export const CardItem = styled.li`
    margin-bottom: 10px;
    & > svg {
        color: ${props => props.theme.colors.theme.blue};
        width: 30%;
    }
    & > section{
        width:100%;
    }
    cursor: pointer;
`
export const DetailSection = styled.section`
    width: 320px;
    margin: 10px 30px 0 0;
    padding: 30px;
    flex-grow: 1;
    flex-direction: column;
    border: 2px solid ${props => props.theme.colors.border.light_gray};
    border-radius: ${props => props.theme.border_radius.lv2};
    display: ${props => (props.isDetailOpen ? 'flex' : 'none')};
`

export const DetailHeader = styled.header`
    display: flex;
    flex-direction: column;

    & > h3 {
        font-size: ${props => props.theme.font_size.lv4};
    }
`

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`

export const DetailBody = styled.div`
    display: flex;
    margin-top: 20px;
    gap: 8px;
    font-size: ${props => props.theme.font_size.lv3};
`

export const IntroductionSection = styled.section`
    flex-grow: 1;
    border: 5px solid ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green_light}` : `${props.theme.colors.theme.blue_light}`};
    border-radius: ${props => props.theme.border_radius.lv2};
    padding: 15px;
    height: 50%;
    margin-top: 30px;
`

export const Footer = styled.footer`
    width: 100vw;
    height: 30px;
    position: fixed;
    bottom: 0;
    background-color: ${props => props.theme.colors.background_color.white};
`