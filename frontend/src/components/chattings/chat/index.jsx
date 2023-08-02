import React from "react";
import { Chat, Chatinput, ChatinputButton, Chatmessage } from "./style";
import ChatHeader from "./chatheader";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Message from "./message";
import { useState } from "react";
import SimpleSlider from "./videocarousel";
import * as S from './style';

function Chat1() {

    const [addtypes, setaddtypes] = useState({
        addbutton: true,
        cambutton: false,
    });

    const addClick = (e) => {
        e.preventDefault();
        setaddtypes({
            ...addtypes,
            addbutton: !addtypes.addbutton
        });
    }

    const handleCamButtonChange = (cambutton) => {
        setaddtypes({
            ...addtypes,
            cambutton: cambutton
        });
    }

    console.log(addtypes)
    return (
        <Chat>
            <ChatHeader onCamButtonClick={handleCamButtonChange} />
                <S.ChatSlider cambutton={addtypes.cambutton}>
                    <SimpleSlider/>
                </S.ChatSlider>
            <Chatmessage addbutton={addtypes.addbutton} cambutton={addtypes.cambutton}>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </Chatmessage>
            <Chatinput>
                <AddCircleIcon onClick={addClick} fontSize="large" />
                <form>
                    <input placeholder={`Message #TESTCHANNEL`} />
                    <ChatinputButton type="submit">
                        Send Message
                    </ChatinputButton>
                </form>
            </Chatinput>
        </Chat>
    )
}

export default Chat1;
