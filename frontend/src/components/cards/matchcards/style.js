import styled from "styled-components";

export const CardSection = styled.section`
    width: 90%;
    padding: 15px;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 5fr;
    border: 5px solid ${props => props.theme.colors.theme.green_light};
    border-radius: ${props => props.theme.border_radius.lv2};
    font-size: ${props => props.theme.font_size.lv4};
    /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); */
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => props.theme.colors.theme.green_light}; /* Change background color on hover */
    }

    & > img {
        border-radius: 50%;
        width: 50%;
    }
`

export const TextContainer = styled.div`
    display: grid;
    grid-template-columns:5fr 1fr 1fr;
    align-items: center;
    & > h2 {
        font-size: ${props => props.theme.font_size.lv5};
        font-weight: 700
    }

    & > h3 {
        text-align: center;
        font-size: ${props => props.theme.font_size.lv4};
        font-weight: 700;
    }
`


