import { useCallback, useEffect, useState, useRef } from "react";

import * as S from './style';

import Video from "./video";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import Dictionary from "./dictionary";
import BookIcon from '@mui/icons-material/Book';

export default function ChatRoom({ props: { socket, room, setChatRooms, user, chatRooms, setSelectedRoom } }) {
    const [arrivalChat, setArrivalChat] = useState({});
    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState("");
    const messageEndRef = useRef(null);
    const [videoClicked, setVideoClicked] = useState(false);
    const [videoStart, setVideoStart] = useState(false);
    const [dictionaryClicked, setDictionaryClicked] = useState(false);
    const videoTextRef = useRef(null);

    useEffect(() => {
        if (!room.dmRoomId) {
            return;
        }

        setVideoClicked(false);
        setVideoStart(false)
    }, [room.dmRoomId]);

    const getTimeString = (createdAt) => {
        const isCreated = new Date(createdAt);
        isCreated.setHours(isCreated.getHours() + 9);

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

            if (targetRoom) {
                restRooms = chatRooms.filter(chatRoom => chatRoom.dmRoomId !== data.roomId);

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
            } else {
                restRooms = [...chatRooms];

                restRooms.unshift({
                    dmRoomId: data.roomId,
                    memberName: data.senderName,
                    lastMessage: data.messageContent,
                    uncheckMessage: 1,
                });
            }

            return restRooms;
        })
    }, [setChatRooms]);

    const responseChat = useCallback((data) => {
        if (!data.chats) {
            return;
        }

        setChats([...data.chats].reverse().map(chat => { return { ...chat, translate: "" } }));
    }, [setChats]);

    const responseMessage = useCallback((data) => {
        updateChatList(data, room.dmRoomId);

        if (data.roomId !== room.dmRoomId) {
            return;
        }

        setArrivalChat({ memberName: data.memberName, messageContent: data.messageContent, createdAt: data.createdAt, translate: "" });
    }, [room, updateChatList, setArrivalChat]);

    const receiverNotExist = useCallback((data) => {
        if (!videoTextRef.current) {
            return;
        }

        setVideoClicked(false);
        setVideoStart(false)
        videoTextRef.current.innerText = "영상 통화 모달";
    }, [videoTextRef, setVideoClicked, setVideoStart]);

    const responseVideo = useCallback((data) => {
        console.log(data);

        if (!videoTextRef.current) {
            return;
        }

        console.log(videoTextRef.current);

        setSelectedRoom(chatRooms.filter(chatRoom => chatRoom.dmRoomId === data.roomId)[0]);
        videoTextRef.current.innerText = data.sender_name + "(으)로 부터 온 전화";

        setVideoClicked(true);
    }, [videoTextRef, setVideoClicked, setSelectedRoom, chatRooms]);

    console.log(videoClicked);

    const responseVideoAccept = useCallback((data) => {
        setVideoClicked(false);
        setVideoStart(true);
    }, [setVideoClicked, setVideoStart]);

    const responseVideoReject = useCallback(() => {
        if (!videoTextRef.current) {
            return;
        }

        videoTextRef.current.innerText = "영상 통화 모달";

        setVideoClicked(false);
        setVideoStart(false);
    }, [videoTextRef, setVideoClicked, setVideoStart]);

    useEffect(() => {
        socket.on('responseChatting', responseChat);
        socket.on('responseMessage', responseMessage);
        socket.on('responseVideo', responseVideo);
        socket.on('receiverNotExist', receiverNotExist);
        socket.on('responseVideoAccept', responseVideoAccept);
        socket.on('responseVideoReject', responseVideoReject);

        if (!room.dmRoomId) {
            return () => {
                socket.off('responseChatting', responseChat);
                socket.off('responseMessage', responseMessage);
                socket.off('responseVideo', responseVideo);
                socket.off('receiverNotExist', receiverNotExist);
                socket.off('responseVideoAccept', responseVideoAccept);
                socket.off('responseVideoReject', responseVideoReject);
            };
        }

        socket.emit("joinRoom", {
            sender: user.memberMail,
            receiver: room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
        });

        return () => {
            socket.off('responseChatting', responseChat);
            socket.off('responseMessage', responseMessage);
            socket.off('responseVideo', responseVideo);
            socket.off('receiverNotExist', receiverNotExist);
            socket.off('responseVideoAccept', responseVideoAccept);
            socket.off('responseVideoReject', responseVideoReject);
        }
    }, [room, socket, responseChat, responseMessage, user, responseVideo, receiverNotExist, responseVideoAccept, responseVideoReject]);

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

    useEffect(() => {
        setChatRooms(chatRooms => {
            return chatRooms.map(chatRoom => {
                if (chatRoom.dmRoomId === room.dmRoomId) {
                    return {
                        ...chatRoom,
                        uncheckMessage: 0,
                    }
                } else {
                    return chatRoom;
                }
            });
        })
    }, [room, setChatRooms]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!newChat)
            return;

        socket.emit('requestMessage', {
            "roomId": room.dmRoomId,
            "sender": user.memberMail,
            "senderName": user.memberName,
            "receiver": room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
            "messageContent": newChat,
            "readCheck": false,
        });

        setNewChat('');
    }

    const onChangeInput = useCallback((e) => {
        setNewChat(e.target.value);
    }, [setNewChat]);

    const onClickVideoRequest = useCallback(() => {
        socket.emit('requestMessage', {
            "roomId": room.dmRoomId,
            "sender": user.memberMail,
            "senderName": user.memberName,
            "receiver": room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
            "messageContent": user.memberName + '으로 부터의 영상 통화',
            "readCheck": false,
        });

        socket.emit('requestVideo', {
            "roomId": room.dmRoomId,
            "sender": user.memberMail,
            "sender_name": user.memberName,
            "receiver": room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
        });

        videoTextRef.current.innerText = room.memberName + "에게 전화 거는 중";

        setVideoClicked(true);
    }, [setVideoClicked, socket, room, user, videoTextRef]);

    const onClickVideoConfirm = useCallback(() => {
        socket.emit('requestVideoAccept', {
            "receiver": room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
        });

        setVideoClicked(false);
        setVideoStart(true);
    }, [socket, room, user, setVideoClicked, setVideoStart]);

    const onClickVideoRejcet = useCallback(() => {
        socket.emit('requestVideoReject', {
            "receiver": room.dmRoomId.split('_')[1 - room.dmRoomId.split('_').indexOf(user.memberMail)],
        });

        videoTextRef.current.innerText = "영상 통화 모달";

        setVideoClicked(false);
        setVideoStart(false);
    }, [socket, videoTextRef, setVideoClicked, setVideoStart, user, room]);

    const onClickDictionary = useCallback(() => {
        setDictionaryClicked(clicked => !clicked);
    }, [setDictionaryClicked]);

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
        <>
            <S.SectionChat>
                <S.HeaderChat>
                    <h2>{room.memberName}</h2>
                    <S.HeaderButtonNormal onClick={onClickVideoRequest} visible={!videoStart && room.dmRoomId}>
                        <AddIcCallIcon />
                    </S.HeaderButtonNormal>
                    <S.HeaderButtonNormal onClick={onClickDictionary} visible={true}>
                        <BookIcon />
                    </S.HeaderButtonNormal>
                </S.HeaderChat>
                <S.VideoModalWrapper visible={videoClicked}>
                    <S.VideoModal>
                        <S.VideoModalHeader>
                            <h3 ref={videoTextRef}>영상 통화 모달</h3>
                        </S.VideoModalHeader>
                        <S.VideoButtonWrapper>
                            {
                                videoTextRef && videoTextRef.current && !videoTextRef.current.innerText.includes("에게") && <S.VideoConfirmButton onClick={onClickVideoConfirm}>confirm</S.VideoConfirmButton>
                            }
                            <S.VideoRejectButton onClick={onClickVideoRejcet}>reject</S.VideoRejectButton>
                        </S.VideoButtonWrapper>
                    </S.VideoModal>
                </S.VideoModalWrapper>
                <S.DictionaryWrapper>
                    {
                        room.dmRoomId && <S.VideoWrapper>
                            <Video props={{ videoStart, setVideoStart, room, user, socket }} />
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

                                        const Translate = async () => {
                                            const response = await fetch(process.env.REACT_APP_TRANSLATION_SERVER + '/ko/en/' + chat.messageContent);
                                            const result = await response.json();

                                            setChats(chats => chats.map(c => {
                                                if (c.memberName === chat.memberName && c.messageContent === chat.messageContent && c.createdAt === chat.createdAt) {
                                                    return {
                                                        ...c,
                                                        translate: result.translated,
                                                    }
                                                } else {
                                                    return c;
                                                }
                                            }))
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
                                                                            <S.TranslateWrapper>
                                                                                {
                                                                                    !chat.translate && <S.TranslateButton onClick={Translate}>번역</S.TranslateButton>
                                                                                }
                                                                                {displayTime && <S.Time>{timeValue}</S.Time>}
                                                                            </S.TranslateWrapper>
                                                                        }
                                                                        <S.MyChat>{chat.messageContent}</S.MyChat>
                                                                    </S.TimeWrapper>
                                                                    {
                                                                        chat.translate && <S.TranslateTextMy>{chat.translate}</S.TranslateTextMy>
                                                                    }
                                                                </S.MyChatWrapper>
                                                                : <S.OppositeChatWrapper>
                                                                    {
                                                                        (displayProfile) && <S.OppositeUserName>{chat.memberName}</S.OppositeUserName>
                                                                    }
                                                                    <S.TimeWrapper>
                                                                        <S.OppositeChat>{chat.messageContent}</S.OppositeChat>
                                                                        {
                                                                            <S.TranslateWrapper>
                                                                                {
                                                                                    !chat.translate && <S.TranslateButton onClick={Translate}>번역</S.TranslateButton>
                                                                                }
                                                                                {displayTime && <S.Time>{timeValue}</S.Time>}
                                                                            </S.TranslateWrapper>
                                                                        }
                                                                    </S.TimeWrapper>
                                                                    {
                                                                        chat.translate && <S.TranslateTextOpposite>{chat.translate}</S.TranslateTextOpposite>
                                                                    }
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
                        </S.VideoWrapper>
                    }
                    <Dictionary props={{ dictionaryClicked }} />
                </S.DictionaryWrapper>
            </S.SectionChat >
        </>
    )
}
