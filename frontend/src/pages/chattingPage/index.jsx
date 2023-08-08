import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';

import * as S from './style';

import ChatList from "./chatlist";

export default function ChattingPage() {
    const socketRef = useRef();
    const [socketUpdated, setSocketUpdated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser({
            "memberId": "2",
            "memberMail": "lwc@naver.com",
            "memberName": "이우철",
        });
    }, []);

    useEffect(() => {
        if (!user.memberName) {
            return;
        }

        socketRef.current = io.connect(process.env.REACT_APP_CHATTING_SERVER);

        socketRef.current.emit('connectUser', {
            userMail: user.memberMail,
        });

        const cleanup = () => {
            socketRef.current.emit("disconnectUser", {
                userMail: user.memberMail,
            });

            socketRef.current.disconnect();
        }

        window.addEventListener('beforeunload', cleanup);

        setSocketUpdated(true);

        return () => {
            cleanup();
            window.removeEventListener('beforeunload', cleanup);
        }
    }, [user]);

    return (
        <S.Main>
            <ChatList props={{ socketUpdated, socket: socketRef.current, user }} />
        </S.Main>
    )
}