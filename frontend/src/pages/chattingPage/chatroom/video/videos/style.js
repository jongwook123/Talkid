import styled from "styled-components";

export const VideoList = styled.ul`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const VideoListItem = styled.li`
    width: 220px;
    border-radius: ${props => props.theme.border_radius.lv4};
    overflow: hidden;

    & > video {
        width: 100%;
    }
`