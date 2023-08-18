import styled from "styled-components";

export const PageMain = styled.main`
    position: relative;
    height: calc(100vh - 80px);
    margin-top: 80px;
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
            ${props => props.memberTypeId === 1 && 
            `
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                transform: scale(1.05);
                cursor: pointer;
                
            `}
        }
`

export const ButtonWrapper = styled.div`
    width: 40%;

`