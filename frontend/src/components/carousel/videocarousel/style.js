import styled from "styled-components";
import IROnly from "styles/IROnly";

export const CaruoselWrapper = styled.div`
    flex-grow: 1;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
`

export const VideoList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: calc(50% - 135px);
    gap: 50px;
    height: 100%;
    transition: all 0.2s;
    margin-left: ${props => props.margin};
`

export const CarouselButton = styled.button`
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 28px;
    background-color: inherit;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    color: ${props => props.theme.colors.font.light_black};

    & > span {
        ${IROnly}
    }
`

export const LeftButton = styled(CarouselButton)`
    left: 30px;
`

export const RightButton = styled(CarouselButton)`
    right: 30px;
`