import styled from 'styled-components';


export const Chat = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.75;
    background-color: white;
    height: 100vh;
    justify-content: space-between;
    
`

export const Chatmessage = styled.div`
    flex: 1;
    background-color: #FFECDF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    max-height: calc(100vh - 130px); /* Adjust the value based on your ChatHeader height and Chatinput height */
    overflow-y: auto; 
    margin:20px;
    margin-bottom: 0;
    height: 50px;
    /* ${(props) => 
        !props.cambutton && `
        
        `
    } */
    
`
export const Chatinput = styled.div`
    color: lightgray;
    display: flex;
    align-items: center; /* Vertically center the content */
    padding: 15px;
    border-bottom-left-radius: 5px;
    margin: 20px;
    border-top: 1px solid;
    background-color: #FFECDF;
    height: 7%;
    margin-top: 0;
    & > .MuiSvgIcon-root {
        margin: 5px;
        cursor: pointer;
        :hover {
            color: black;
        }
    }
    /* Apply styles to the form container */
    & > form {
        display: flex;
        align-items: center; /* Vertically center the form content */
        flex: 1;
        margin-left: 10px; /* Add some space between the icon and the form */
    }

    & > form > input {
        padding: 15px;
        background: transparent;
        border: none;
        outline-width: 0;
        color: white;
        font-size: large;
        flex: 1; /* Take remaining space in the form container */
    }


`;

export const ChatinputButton = styled.button`
display: none;
`
export const ChatinputIcons = styled.div`
 & > .MuiSvgIcon-root {
    padding: 5px;
    margin-bottom:10px;
 }
`
export const ChatSlider = styled.div`
    ${(props) => 
            !props.cambutton && `
            display: none;
            `
        }
`