import { useCallback, useEffect, useState } from 'react'

import * as S from './style';

import ChatRoom from '../chatroom';

export default function ChatList({ props: { socketUpdated, socket } }) {
    const [selectedRoom, setSelectedRoom] = useState("");
    const [chatRooms, setChatRooms] = useState([]);

    const updateChatRooms = useCallback((data) => {
        setChatRooms(data.rooms);
    }, [setChatRooms]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('responseRooms', updateChatRooms);

        socket.emit("requestRooms", {
            userEmail: "test",
        });

        return () => {
            socket.off('responseRooms', updateChatRooms);
        }
    }, [socket, updateChatRooms]);

    if (!socketUpdated) {
        return;
    }

    const onClickSelect = (e) => {
        setSelectedRoom(e.currentTarget.querySelector('span:nth-child(3)').innerText);
    }

    console.log(chatRooms);

    return (
        <>
            <S.SectionUser>
                <S.UserForm>
                    <label htmlFor="userInput">대화 검색</label>
                    <S.UserInput id='userInput' placeholder='대화 찾기' />
                </S.UserForm>
                <S.UserHeader>
                    <h2>Direct Message</h2>
                </S.UserHeader>
                <S.UserList>
                    {
                        chatRooms.map((chatRoom) => {
                            return (
                                <S.UserListItem key={chatRoom.roomId}>
                                    <S.UserButton onClick={onClickSelect}>
                                        <S.ButtonTextWrapper>
                                            <span>person</span>
                                            <span>{chatRoom.lastMessage}</span>
                                        </S.ButtonTextWrapper>
                                        <span left={chatRoom.uncheckMessage === 0}>{chatRoom.uncheckMessage}</span>
                                        <span>{chatRoom.roomId}</span>
                                    </S.UserButton>
                                </S.UserListItem>
                            )
                        })
                    }

                </S.UserList>
            </S.SectionUser>
            <ChatRoom props={{ socket, roomId: selectedRoom, setChatRooms }} />
        </>
    )
}
