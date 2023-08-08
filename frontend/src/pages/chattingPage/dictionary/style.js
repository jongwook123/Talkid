import styled from "styled-components";

export const Section = styled.section`
    width: 300px;
    display: ${props => props.dictionaryClicked ? 'block' : 'none'};
    /* border-left: 1px solid ${props => props.theme.colors.theme.blue_light}; */
`

export const SectionHeader = styled.header`
    width: 100%;
    font-family: 'Righteous', sans-serif;
    text-align: center;
    font-size: ${props => props.theme.font_size.lv4};
`