import styled from 'styled-components';


export const Message1 = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    color: black;
    font-size: medium;
    /* background-color: #CAD4DF; */
    
`
export const MessageInfo = styled.div`
    background-color: #9BBA8E;
    border-radius: 5px;
    padding: 10px;
    margin-left: 20px;
    &>p {
        font-size: large;
    }
`
export const Messagetimestamp = styled.span`
    color: gray;
    margin-left: 20px;
    font-size: small;
`