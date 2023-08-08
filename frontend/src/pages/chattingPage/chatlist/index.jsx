import { useCallback, useEffect, useState } from 'react'

import * as S from './style';

import ChatRoom from '../chatroom';

export default function ChatList({ props: { socketUpdated, socket, user } }) {
    const [selectedRoom, setSelectedRoom] = useState({});
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
            userId: user.memberId,
            userMail: user.memberMail,
        });

        return () => {
            socket.off('responseRooms', updateChatRooms);
        }
    }, [socket, updateChatRooms, user]);

    if (!socketUpdated) {
        return;
    }

    const onClickSelect = (e) => {
        const selected = chatRooms.filter(chatRoom => chatRoom.dmRoomId === e.currentTarget.querySelector('span:nth-child(3)').innerText);
        setSelectedRoom(selected[0]);
    }

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
                        chatRooms.map((chatRoom, index) => {
                            return (
                                <S.UserListItem key={"" + chatRoom.roomId + index}>
                                    <S.UserButton onClick={onClickSelect}>
                                        <S.ButtonTextWrapper>
                                            <span>{chatRoom.memberName}</span>
                                            <span>{chatRoom.lastMessage}</span>
                                        </S.ButtonTextWrapper>
                                        <S.UnreadCount>{chatRoom.uncheckMessage}</S.UnreadCount>
                                        <span>{chatRoom.dmRoomId}</span>
                                    </S.UserButton>
                                </S.UserListItem>
                            )
                        })
                    }

                </S.UserList>
            </S.SectionUser>
            <ChatRoom props={{ socket, room: selectedRoom, setChatRooms, user }} />
        </>
    )
}
