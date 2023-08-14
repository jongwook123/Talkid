import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Section = styled.section`
    height: 260px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    background-color: ${props => props.theme.colors.theme.blue_light4};
`

export const SectionHeader = styled.header`
    & > h3 {
        ${IROnly}
    }
`

export const HeaderList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 260px;
    background-color: ${props => props.theme.colors.theme.blue_light2};

    & > li > button {
        margin: 12px 0;
    }
`

export const HeaderListButton = styled.button`
    border: 0;
    background-color: inherit;
    display: ${props => props.visible ? 'flex' : 'none'};
`

export const ListButtonNormal = styled(HeaderListButton)`
    color: ${props => props.theme.colors.theme.green_dark}; 
`

export const ListButtonOff = styled(HeaderListButton)`
    color: ${props => props.theme.colors.theme.orange_dark};
`

export const ListButtonTranslate = styled(HeaderListButton)`
    color: ${props => props.isOn ? props.theme.colors.theme.green_dark : props.theme.colors.theme.orange_dark};
`