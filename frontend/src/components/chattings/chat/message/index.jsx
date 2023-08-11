import React from "react";
import { Message1, MessageInfo, Messagetimestamp } from "./style";
import { Avatar } from "@mui/material";


function Message() {
    return (
        <Message1>
            <Avatar/>
            <MessageInfo>
                    ssssangha
                    <Messagetimestamp>
                        this is a timestamp
                    </Messagetimestamp>
                <p>This is a message</p>
            </MessageInfo>
        </Message1>
    )
}

export default Message;