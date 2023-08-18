import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Section = styled.section`
    width: 300px;
    margin-left: auto;
    background-color: ${props => props.theme.colors.theme.blue_light};
    display: ${props => props.dictionaryClicked ? 'flex' : 'none'};
    flex-direction: column;
`

export const SectionHeader = styled.header`
    width: 100%;
    font-family: 'Righteous', sans-serif;
    display: flex;
    border-bottom: 1px solid ${props => props.theme.colors.theme.blue};

    & > h3 {
        ${IROnly}
    }

    & > div:last-child {
        width: 80px;
        margin-right: 10px;
    }
`

export const HeaderWarpper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`

export const ResultWrapper = styled.ul`
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;    
    }

    & > li {
        width: 100%;
        display: flex;
        flex-direction: column;

        & > p:nth-child(2) {
            color: ${props => props.theme.colors.font.light_black};
            font-size: ${props => props.theme.font_size.lv3};
            margin-bottom: 5px;
        }
    }
`

export const TextWrapper = styled.div`
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 12px;

    & > p:first-child {
        color: ${props => props.theme.colors.font.light_black};
        font-size: ${props => props.theme.font_size.lv4};
    }

    & > p:last-child {
        color: ${props => props.theme.colors.font.light_gray};
        font-size: ${props => props.theme.font_size.lv3};
    }
`