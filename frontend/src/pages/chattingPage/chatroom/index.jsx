import { useCallback, useEffect, useState } from "react";

import * as S from './style';

const userEmail = "a@gmail.com";

export default function ChatRoom({ props: { socket, roomId, setChatRooms } }) {
    const [arrivalChat, setArrivalChat] = useState({});
    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState("");

    const updateChatList = useCallback((data, roomId) => {
        setChatRooms(chatRooms => {
            return chatRooms.map((chatRoom) => {
                if (chatRoom.roomId === data.roomId) {
                    if (chatRoom.roomId === roomId) {
                        return {
                            roomId: chatRoom.roomId,
                            lastMessage: data.message,
                            uncheckMessage: 0,
                        };
                    } else {
                        return {
                            roomId: chatRoom.roomId,
                            lastMessage: data.message,
                            uncheckMessage: chatRoom.uncheckMessage + 1,
                        };
                    }
                } else {
                    return chatRoom;
                }
            })
        })
    }, [setChatRooms]);

    const responseChat = useCallback((data) => {
        setChats([...data.chats]);
    }, [setChats]);

    const responseMessage = useCallback((data) => {
        updateChatList(data, roomId);

        if (data.roomId !== roomId) {
            return;
        }

        setArrivalChat({ sender: data.sender, message: data.message });
    }, [roomId, updateChatList, setArrivalChat]);

    useEffect(() => {
        socket.on('responseChatting', responseChat);
        socket.on('responseMessage', responseMessage);

        socket.emit("joinRoom", {
            roomId: roomId,
            userEmail: userEmail,
        });

        return () => {
            socket.off('responseChatting', responseChat);
            socket.off('responseMessage', responseMessage);
        }
    }, [roomId, socket, responseChat, responseMessage]);

    useEffect(() => {
        if (!arrivalChat.sender) {
            return;
        }

        setChats((prev) => [...prev, arrivalChat])
    }, [arrivalChat]);

    const sendMessage = async (e) => {
        e.preventDefault();
    
        if (!newChat)
            return;

        socket.emit('requestMessage', {
            roomId: roomId,
            sender: userEmail,
            message: newChat,
        });

        setNewChat('');
    }

    const onChangeInput = (e) => {
        setNewChat(e.target.value);
    }

    if (!roomId) {
        return;
    }

    return (
        <S.SectionChat>
            <S.HeaderChat>
                <h2>{roomId}</h2>
            </S.HeaderChat>
            <S.ListChat>
                {
                    chats.map((chat, index) => {
                        return (
                            <p key={chat + index}>{chat.sender} : {chat.message}</p>
                        )
                    })
                }
            </S.ListChat>
            <S.FormChat>
                <label htmlFor="newChat">대화 입력</label>
                <S.FormInput id="newChat" value={newChat} onChange={onChangeInput} placeholder="Send Message" />
                <S.FormButton onClick={sendMessage}>send</S.FormButton>
            </S.FormChat>
        </S.SectionChat>
    )
}
