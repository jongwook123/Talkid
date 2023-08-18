import styled from "styled-components";

export const VideoWrapper = styled.li`
    width: 220px;
    position: relative;

    & > video {
        width: 100%;
        border-radius: ${props => props.theme.border_radius.lv4};
    }
`

export const Translated = styled.p`
    padding: 14px;
    max-width: 200px;
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translate(-50%);
    background-color: ${props => props.theme.colors.background_color.white};
    border-radius: ${props => props.theme.border_radius.lv3};
    border: 1px solid ${props => props.theme.colors.border.light_gray};
    /* display: ${props => props.visible ? 'block' : 'none'}; */

    &::after {
        content: '';
        width: 16px;
        height: 16px;
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translate(-50%) rotate(45deg);
        background-color: ${props => props.theme.colors.background_color.white};
        border-left: 1px solid ${props => props.theme.colors.border.light_gray};
        border-top: 1px solid ${props => props.theme.colors.border.light_gray};
    }
`