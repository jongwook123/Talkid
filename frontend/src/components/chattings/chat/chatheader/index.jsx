import React from "react";
import { ChatHeader1, ChatHeaderhash, ChatHeaderleft, ChatHeaderright, ChatHeadersearch } from "./style";
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useState } from "react";

function ChatHeader({ onCamButtonClick }) {

    const [camtypes, setcamtypes] = useState({
        cambutton: false,
    });

    const camClick = (e) => {
        e.preventDefault();
        setcamtypes({
            ...camtypes,
            cambutton: !camtypes.cambutton
        });

        // Call the callback function to pass the updated cambutton value
        onCamButtonClick(!camtypes.cambutton);
    }

    return (
        <ChatHeader1>
            <ChatHeaderleft>
                <ChatHeaderhash>
                    #
                </ChatHeaderhash>
                Test Channel Name
            </ChatHeaderleft>
            <ChatHeaderright>
                <VideocamIcon onClick={camClick} fontSize="large" />
                <ChatHeadersearch>
                    <input placeholder="Search" />
                    <SearchIcon />
                </ChatHeadersearch>
            </ChatHeaderright>
        </ChatHeader1>
    )
}

export default ChatHeader;
