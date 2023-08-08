import { useCallback, useEffect, useState, useRef } from "react";

import * as S from './style';

export default function ChatRoom({ props: { socket, room, setChatRooms, user } }) {
    const [arrivalChat, setArrivalChat] = useState({});
    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState("");
    const messageEndRef = useRef(null);

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

    const updateChatList = useCallback((data, roomId) => {
        setChatRooms(chatRooms => {
            const targetRoom = chatRooms.filter(chatRoom => chatRoom.dmRoomId === data.roomId)[0];
            let restRooms = [];

            if (targetRoom.dmRoomId) {
                restRooms = chatRooms.filter(chatRoom => chatRoom.dmRoomId !== data.roomId);
            } else {
                restRooms = [...chatRooms];
            }

            if (targetRoom.dmRoomId === roomId) {
                restRooms.unshift({
                    dmRoomId: targetRoom.dmRoomId,
                    memberName: targetRoom.memberName,
                    lastMessage: data.messageContent,
                    uncheckMessage: 0,
                });
            } else {
                restRooms.unshift({
                    dmRoomId: targetRoom.dmRoomId,
                    memberName: targetRoom.memberName,
                    lastMessage: data.messageContent,
                    uncheckMessage: targetRoom.uncheckMessage + 1,
                });
            }

            return restRooms;
        })
    }, [setChatRooms]);

    const responseChat = useCallback((data) => {
        setChats([...data.chats].reverse());
    }, [setChats]);

    const responseMessage = useCallback((data) => {
        updateChatList(data, room.dmRoomId);

        if (data.roomId !== room.dmRoomId) {
            return;
        }

        setArrivalChat({ memberName: data.memberName, messageContent: data.messageContent, createdAt: data.createdAt });
    }, [room, updateChatList, setArrivalChat]);

    useEffect(() => {
        socket.on('responseChatting', responseChat);
        socket.on('responseMessage', responseMessage);


        if (!room.dmRoomId) {
            return;
        }

        socket.emit("joinRoom", {
            sender: user.memberMail,
            receiver: room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
        });

        return () => {
            socket.off('responseChatting', responseChat);
            socket.off('responseMessage', responseMessage);
        }
    }, [room, socket, responseChat, responseMessage, user]);

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

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!newChat)
            return;

        socket.emit('requestMessage', {
            "roomId": room.dmRoomId,
            "sender": user.memberMail,
            "receiver": room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
            "messageContent": newChat,
            "readCheck": false,
        });

        setNewChat('');
    }

    const onChangeInput = (e) => {
        setNewChat(e.target.value);
    }

    if (!room.dmRoomId) {
        return;
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
        <S.SectionChat>
            <S.HeaderChat>
                <h2>{room.memberName}</h2>
            </S.HeaderChat>
            <S.ListChat>
                {
                    chats.map((chat, index) => {
                        let displayTime = true;
                        const timeValue = getTimeString(chat.createdAt);
                        let displayDate = false;
                        let today = '';
                        let displayProfile = false;

                        const isCreated = new Date(chat.createdAt);
                        isCreated.setHours(isCreated.getHours());

                        if (index !== chats.length - 1) {
                            const nextSender = chats[index + 1].memberName;

                            if (nextSender === chat.memberName) {
                                const nextTimeValue = getTimeString(chats[index + 1].createdAt);

                                if (nextTimeValue === timeValue) {
                                    displayTime = false;
                                }
                            }
                        }

                        if (index !== 0) {
                            const prevCreated = new Date(chats[index - 1].createdAt);
                            prevCreated.setHours(prevCreated.getHours());

                            if (isCreated.getDate() !== prevCreated.getDate()) {
                                displayDate = true;
                                today = `${isCreated.getMonth() + 1}월 ${isCreated.getDate()}일 ${getDay(isCreated)}요일`;
                            }
                        }

                        if (index === 0) {
                            displayDate = true;
                            today = `${isCreated.getMonth() + 1}월 ${isCreated.getDate()}일 ${getDay(isCreated)}요일`;
                        }

                        if (index !== 0) {
                            const prevSender = chats[index - 1].memberName;
                            const prevCreatedDate = new Date(chats[index - 1].createdAt);
                            prevCreatedDate.setHours(prevCreatedDate.getHours())

                            if (prevSender !== chat.memberName || prevCreatedDate.getDate() !== isCreated.getDate()) {
                                displayProfile = true;
                            }
                        } else {
                            displayProfile = true;
                        }

                        return (
                            <S.ChatWrapper key={"" + chat.messageContent + index + chat.memberName}>
                                {
                                    <>
                                        {
                                            displayDate && <S.Datewrapper>{today}</S.Datewrapper>
                                        }
                                        {
                                            chat.memberName === user.memberName
                                                ? <S.MyChatWrapper>
                                                    {
                                                        (displayProfile) && <S.MyUserName>{chat.memberName}</S.MyUserName>
                                                    }
                                                    <S.TimeWrapper>
                                                        {
                                                            displayTime && <S.Time>{timeValue}</S.Time>
                                                        }
                                                        <S.MyChat>{chat.messageContent}</S.MyChat>
                                                    </S.TimeWrapper>
                                                </S.MyChatWrapper>
                                                : <S.OppositeChatWrapper>
                                                    {
                                                        (displayProfile) && <S.OppositeUserName>{chat.memberName}</S.OppositeUserName>
                                                    }
                                                    <S.TimeWrapper>
                                                        <S.OppositeChat>{chat.messageContent}</S.OppositeChat>
                                                        {
                                                            displayTime && <S.Time>{timeValue}</S.Time>
                                                        }
                                                    </S.TimeWrapper>
                                                </S.OppositeChatWrapper>
                                        }
                                    </>
                                }
                            </S.ChatWrapper>

                        )
                    })
                }
                <li>
                    <div ref={messageEndRef}></div>
                </li>
            </S.ListChat>
            <S.FormWrapper>
                <S.FormChat>
                    <label htmlFor="newChat">대화 입력</label>
                    <S.FormInput id="newChat" value={newChat} onChange={onChangeInput} placeholder="Send Message" />
                    <S.FormButton onClick={sendMessage}>send</S.FormButton>
                </S.FormChat>
            </S.FormWrapper>
        </S.SectionChat >
    )
}
