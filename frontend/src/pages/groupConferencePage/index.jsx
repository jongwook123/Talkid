import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client';

import * as S from './style';

import GroupChatRoom from "./groupchatroom";

import { GetUserInfo } from "apis/UserAPIs";
import { useCallback } from "react";

export default function ChattingPage() {
    const [groupId, setGroupId] = useState("");
    const socketRef = useRef();
    const [socketUpdated, setSocketUpdated] = useState(false);
    const [user, setUser] = useState({});
    const nowUser = useSelector(state => state.user);

    const cleanup = useCallback(() => {
        if (!socketRef.current) {
            return;
        }

        socketRef.current.emit("disconnectGroup", {
            userMail: user.memberMail,
        });

        socketRef.current.disconnect();
    }, [socketRef, user]);

    useEffect(() => {
        const getUser = async () => {
            const result = await GetUserInfo(nowUser.accessToken);

            setUser(result.response);
            setGroupId("test");
        }

        getUser();
    }, [nowUser]);

    useEffect(() => {
        window.addEventListener('beforeunload', cleanup);

        if (!user.memberName || !groupId) {
            return () => {
                cleanup();
                window.removeEventListener('beforeunload', cleanup);
            };
        }

        socketRef.current = io.connect(process.env.REACT_APP_CHATTING_SERVER);

        setSocketUpdated(true);

        return () => {
            cleanup();
            window.removeEventListener('beforeunload', cleanup);
        }
    }, [user, groupId, cleanup]);

    return (
        <S.Main>
            <GroupChatRoom props={{ socketUpdated, socket: socketRef.current, user, groupId }} />
        </S.Main>
    )
}
