import { useState, useRef, useCallback, useEffect } from 'react';

import * as S from './style';

import Video from './video';
import Dictionary from './dictionary';
import BookIcon from '@mui/icons-material/Book';

export default function GroupChatRoom({ props: { socketUpdated, socket, user, groupId } }) {
    const [selectedRoom, setSelectedRoom] = useState(groupId);
    const [subRooms, setSubRooms] = useState([]);
    const [arrivalChat, setArrivalChat] = useState({});
    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState("");
    const messageEndRef = useRef(null);
    const [dictionaryClicked, setDictionaryClicked] = useState(false);

    const responseMessage = useCallback((data) => {
        setArrivalChat({ memberName: data.sender, messageContent: data.messageContent, createdAt: data.createdAt, translate: "" });
    }, [setArrivalChat]);

    const updateNewRoom = useCallback((data) => {
        setSubRooms(subrooms => [...subrooms, data.newRoom]);
    }, [setSubRooms]);

    useEffect(() => {
        if (!groupId) {
            return;
        }

        setSelectedRoom(groupId);
    }, [groupId]);
    
    useEffect(() => {
        if (!socket) {
            return;
        }

        if (!selectedRoom || !user.memberMail) {
            return () => {
                socket.off('responseGroupMessage', responseMessage);
                socket.off('responseNewSubRoom', updateNewRoom);
                socket.emit("exitGroupConference", {
                    roomId: selectedRoom,
                    userMail: user.memberMail,
                });
            };
        }

        socket.on('responseGroupMessage', responseMessage);
        socket.on('responseNewSubRoom', updateNewRoom);

        socket.emit("joinGroupConference", {
            roomId: selectedRoom,
            userMail: user.memberMail,
        });

        return () => {
            socket.off('responseGroupMessage', responseMessage);
            socket.off('responseNewSubRoom', updateNewRoom);
            socket.emit("exitGroupConference", {
                roomId: selectedRoom,
                userMail: user.memberMail,
            });
        }
    }, [selectedRoom, socket, user, responseMessage]);

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
        setChats([]);
    }, [selectedRoom]);

    if (!selectedRoom || !socketUpdated) {
        return;
    }

    const onClickRoomButton = (e) => {
        if (e.currentTarget.querySelector('span').innerText === selectedRoom) {
            return;
        }

        setSelectedRoom(e.currentTarget.querySelector('span').innerText);
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!newChat)
            return;

        socket.emit('requestGroupMessage', {
            "roomId": selectedRoom,
            "sender": user.memberName,
            "messageContent": newChat,
        });

        setNewChat('');
    }

    const onChangeInput = (e) => {
        setNewChat(e.target.value);
    }

    const onClickDictionary = () => {
        setDictionaryClicked(clicked => !clicked);
    }

    const onClickAddSubRoom = () => {
        const newRoom = groupId + " sub room " + (subRooms.length + 1);
        const rooms = [groupId, ...subRooms];

        rooms.forEach(room => {
            socket.emit('requestNewSubRoom', {
                "roomId": room,
                "newRoom": newRoom,
            });
        });
    }

    return (
        <S.SectionWrapper>
            <S.SectionRoom>
                <S.HeaderRooms>
                    <h2>Group Conference</h2>
                </S.HeaderRooms>
                <S.MainRoomWrapper>
                    <S.RoomButton onClick={onClickRoomButton}># <span>{groupId}</span></S.RoomButton>
                </S.MainRoomWrapper>
                <S.SubRoomWrapper>
                    <S.SubRoomAdd onClick={onClickAddSubRoom} visible={user.memberType.memberTypeId !== 2}>
                        <span>+</span>
                        <span>Add sub room</span>
                    </S.SubRoomAdd>
                    <S.RoomList>
                        {
                            subRooms.map(subRoom => {
                                return (
                                    <S.RoomListItem key={subRoom}>
                                        <S.RoomButton onClick={onClickRoomButton}># <span>{subRoom}</span></S.RoomButton>
                                    </S.RoomListItem>
                                )
                            })
                        }
                    </S.RoomList>
                </S.SubRoomWrapper>
            </S.SectionRoom>
            <S.SectionChat>
                <S.HeaderChat>
                    <h2>{selectedRoom}</h2>
                    <S.HeaderButtonNormal onClick={onClickDictionary} visible={true}>
                        <BookIcon />
                    </S.HeaderButtonNormal>
                </S.HeaderChat>
                <S.DictionaryWrapper>
                    {
                        <S.VideoWrapper>
                            <Video props={{ room: selectedRoom, user, groupId }} />
                            <S.ListChat>
                                {
                                    chats.map((chat, index) => {
                                        let displayProfile = false;

                                        if (index !== 0) {
                                            const prevSender = chats[index - 1].memberName;

                                            if (prevSender !== chat.memberName) {
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
        </S.SectionWrapper>
    )
}
