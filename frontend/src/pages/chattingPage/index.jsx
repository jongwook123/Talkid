import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';

import * as S from './style';

import ChatList from "./chatlist";

export default function ChattingPage() {
    const socketRef = useRef();
    const [socketUpdated, setSocketUpdated] = useState(false);

    useEffect(() => {
        socketRef.current = io.connect(process.env.REACT_APP_CHATTING_SERVER);

        socketRef.current.emit('connectUser', {
            userEmail: "test",
        });

        const cleanup = () => {
            socketRef.current.emit("disconnectUser", {
                userEmail: "test",
            });

            socketRef.current.disconnect();
        }

        window.addEventListener('beforeunload', cleanup);

        setSocketUpdated(true);

        return () => {
            cleanup();
            window.removeEventListener('beforeunload', cleanup);
        }
    }, []);

    return (
        <S.Main>
            <ChatList props={{ socketUpdated, socket: socketRef.current }}/>
        </S.Main>
    )
}