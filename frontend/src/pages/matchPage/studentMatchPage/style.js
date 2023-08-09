import styled from "styled-components";
import IROnly from "styles/IROnly";

export const PageHeader = styled.header`
    & > h1 {
        ${IROnly}
    }
`

export const PageMain = styled.main`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

export const SearchSection = styled.section`
    display: grid;
    grid-template-columns: 1fr 5fr;
    padding: 30px;
`

export const InputSection = styled.section`
    display: grid;
    grid-template-columns: 5fr 1fr;
`

export const DropboxFieldset = styled.fieldset`
    
`

export const MatchSection = styled.section`
    display: flex;
`

export const CardList = styled.ul`
    padding:30px;
    transition: width 0.3s ease;
    width: ${props => (props.isDetailOpen ? '60%' : '100%')};
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
    flex: 0.5;
    width: 100%;
    margin:30px;
    padding:50px;
    border: 5px solid ${props => props.theme.colors.theme.green_light};
    border-radius: ${props => props.theme.border_radius.lv2};
    flex-grow: 1;
    display: ${props => (props.isDetailOpen ? 'block' : 'none')};
    `

export const DetailHeader = styled.header`
    display: grid;
    grid-template-columns: 1fr 2fr;
    & > img {
        border-radius: 10px;
        width: 90%;
    }
`

export const NameSection = styled.section`
    display: grid;
    grid-template-rows: 1fr 1fr;
    margin: 10px 10px 10px 20px;
    & > p {
        margin-left: 10px;
        font-size: ${props => props.theme.font_size.lv5};
        font-weight: 700;
    }
`

export const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-around;
    
    & > button {
        margin-left: auto;
        margin-top: 10px;
        width: 90%;
        height: 100%;
    }
`

export const DetailBody = styled.div`
    height: 70%;
    margin-top: 15px;
    font-size: ${props => props.theme.font_size.lv4};
    font-weight: 700;
    & > p {
        margin: 10px;
    }
`

export const IntroductionSection = styled.section`
    border: 5px solid ${props => props.theme.colors.theme.green_light};
    border-radius: ${props => props.theme.border_radius.lv2};
    padding:15px;
    height: 50%;
    margin-top: 20px;
`
