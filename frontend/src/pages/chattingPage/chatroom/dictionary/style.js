import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Section = styled.section`
    width: 300px;
    margin-left: auto;
    background-color: ${props => props.theme.colors.theme.blue_light};
    display: ${props => props.dictionaryClicked ? 'block' : 'none'};
    /* border-left: 1px solid ${props => props.theme.colors.theme.blue_light}; */
`

export const SectionHeader = styled.header`
    width: 100%;
    font-family: 'Righteous', sans-serif;

    & > h3 {
        ${IROnly}
    }
`