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

export const CardList = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    
    `

export const CardItem = styled.li`
    margin: 50px;
    display: flex;
    justify-content: center;

    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        transform: scale(1.05);
  }
`