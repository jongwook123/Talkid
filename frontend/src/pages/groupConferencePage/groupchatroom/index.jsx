import { useState, useRef, useCallback, useEffect } from 'react';

import Video from 'pages/chattingPage/chatroom/video';
import Dictionary from 'pages/chattingPage/chatroom/dictionary';
import BookIcon from '@mui/icons-material/Book';

export default function GroupChatRoom({ props: { socketUpdated, socket, user, groupId } }) {
    const [arrivalChat, setArrivalChat] = useState({});
    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState("");
    const messageEndRef = useRef(null);
    const [dictionaryClicked, setDictionaryClicked] = useState(false);

    const getTimeString = (createdAt) => {
        const isCreated = new Date(createdAt);
        isCreated.setHours(isCreated.getHours());

        const hour = new Date(isCreated).getHours();
        const minute = new Date(isCreated).getMinutes();
        const hourValue = hour < 10 ? `0${hour}` : hour;
        const minuteValue = minute < 10 ? `0${minute}` : minute;
        const timeValue = `${hourValue}:${minuteValue}`;

        return timeValue;
    }

    const responseMessage = useCallback((data) => {
        setArrivalChat({ memberName: data.memberName, messageContent: data.messageContent, createdAt: data.createdAt, translate: "" });
    }, [setArrivalChat]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('responseGroupMessage', responseMessage);

        const cleanup = () => {
            socket.emit("exitGroupConference", {
                roomId: groupId,
                userMail: user.memberMail,
            });
    
            socket.disconnect();
        }

        window.addEventListener('beforeunload', cleanup);

        if (!groupId || !user.memberMail) {
            return () => {
                socket.off('responseGroupMessage', responseMessage);
                cleanup();
                window.removeEventListener('beforeunload', cleanup);
            };
        }

        socket.emit("joinGroupConference", {
            roomId: groupId,
            userMail: user.memberMail,
        });

        return () => {
            socket.off('responseGroupMessage', responseMessage);
            cleanup();
            window.removeEventListener('beforeunload', cleanup);
        }
    }, [groupId, socket, user, responseMessage]);

    useEffect(() => {
        if (!arrivalChat.memberName) {
            return;
        }

        setChats((prev) => [...prev, arrivalChat])
    }, [arrivalChat]);

    useEffect(() => {
        if (!messageEndRef.current) {
            return;
        }

        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    if (!groupId || !socketUpdated) {
        return;
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!newChat)
            return;

        // socket.emit('requestMessage', {
        //     "roomId": room.dmRoomId,
        //     "sender": user.memberMail,
        //     "receiver": room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
        //     "messageContent": newChat,
        //     "readCheck": false,
        // });

        setNewChat('');
    }

    const onChangeInput = (e) => {
        setNewChat(e.target.value);
    }

    const onClickDictionary = () => {
        setDictionaryClicked(clicked => !clicked);
    }

    const getDay = (isCreated) => {
        let day = '';

        switch (isCreated.getDay()) {
            case 0:
                day = '일';
                break;
            case 1:
                day = '월';
                break;
            case 2:
                day = '화';
                break;
            case 3:
                day = '수';
                break;
            case 4:
                day = '목';
                break;
            case 5:
                day = '금';
                break;
            case 6:
                day = '토';
                break;
            default:
                break;
        }

        return day;
    }

    return (
        <div>index</div>
    )
}
