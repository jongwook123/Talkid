import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';

import * as S from './style';

import GroupChatRoom from "./groupchatroom";

export default function ChattingPage() {
    const [groupId, setGroupId] = useState("");
    const socketRef = useRef();
    const [socketUpdated, setSocketUpdated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setGroupId("test");
        setUser({
            "memberId": "2",
            "memberMail": "lwc@naver.com",
            "memberName": "이우철",
        });
    }, []);

    useEffect(() => {
        if (!user.memberName || !groupId) {
            return;
        }

        socketRef.current = io.connect(process.env.REACT_APP_CHATTING_SERVER);

        setSocketUpdated(true);
    }, [user, groupId]);

    return (
        <S.Main>
            <GroupChatRoom props={{ socketUpdated, socket: socketRef.current, user, groupId }} />
        </S.Main>
    )
}