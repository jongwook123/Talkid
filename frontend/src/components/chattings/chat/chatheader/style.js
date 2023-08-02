import styled from 'styled-components';


export const ChatHeader1 = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: gray;
    padding:7px;
    border-bottom: 1px solid #CAD4DF;
`

export const ChatHeaderleft = styled.span`
    font-size: large;
    display: flex;
    align-items: center;
    color: black;

`

export const ChatHeaderright = styled.span`
    display: flex;
    align-items: center;
    flex: 0.5;
    justify-content: right;
    margin-right: 2%;
    & > .MuiSvgIcon-root {
        margin: 5px;
        cursor: pointer;
        :hover {
            color: black;
        }
}
`
export const ChatHeaderhash = styled.span`
    color: gray;
    font-size:30px;
    padding: 10px;
`
export const ChatHeadersearch = styled.span`
    display: flex;
    align-items: center;
    color: gray;
    background-color: #E3E5E8;
    border-radius: 3px;
    padding:3px;
    & > input {
        background: transparent;
        outline-width: 0;
        color: white;
        border: none;
    }
`