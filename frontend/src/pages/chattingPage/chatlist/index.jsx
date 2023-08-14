import { useCallback, useEffect, useState } from "react";

import * as S from "./style";

import ChatPageSearch from "components/searchInput/chatpagesearch";
import ChatRoom from "../chatroom";

export default function ChatList({ props: { socketUpdated, socket, user } }) {
  const [input, setInput] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({});
  const [chatRooms, setChatRooms] = useState([]);

  const updateChatRooms = useCallback(
    (data) => {
      // 나중에 지우기
      if (data.rooms.length === 0 && user.memberMail === "lwc@naver.com") {
        socket.emit("joinRoom", {
          sender: user.memberMail,
          receiver: "sdh@naver.com",
        });

        return;
      }

      setChatRooms(data.rooms);
    },
    [setChatRooms, user, socket]
  );

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("responseRooms", updateChatRooms);

    socket.emit("requestRooms", {
      userId: user.memberId,
      userMail: user.memberMail,
    });

    return () => {
      socket.off("responseRooms", updateChatRooms);
    };
  }, [socket, updateChatRooms, user]);

  if (!socketUpdated) {
    return;
  }

  const onClickSelect = (e) => {
    const selected = chatRooms.filter(
      (chatRoom) =>
        chatRoom.dmRoomId ===
        e.currentTarget.querySelector("span:nth-child(3)").innerText
    );
    setSelectedRoom(selected[0]);
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <S.SectionUser>
        <ChatPageSearch
          props={{
            id: "userInput",
            placeholder: "대화 찾기",
            onChangeInput,
            input,
          }}
        />
        <S.UserHeader>
          <h2>Direct Message</h2>
        </S.UserHeader>
        <S.UserList>
          {chatRooms.map((chatRoom, index) => {
            return (
              <S.UserListItem key={"" + chatRoom.dmRoomId + index}>
                <S.UserButton
                  onClick={onClickSelect}
                  selected={selectedRoom.dmRoomId === chatRoom.dmRoomId}
                >
                  <S.ButtonTextWrapper>
                    <span>{chatRoom.memberName}</span>
                    <span>{chatRoom.lastMessage}</span>
                  </S.ButtonTextWrapper>
                  <S.UnreadCount isLeft={chatRoom.uncheckMessage !== 0}>
                    {chatRoom.uncheckMessage}
                  </S.UnreadCount>
                  <span>{chatRoom.dmRoomId}</span>
                </S.UserButton>
              </S.UserListItem>
            );
          })}
        </S.UserList>
      </S.SectionUser>
      <ChatRoom
        props={{
          socket,
          room: selectedRoom,
          setChatRooms,
          user,
          chatRooms,
          setSelectedRoom,
        }}
      />
    </>
  );
}
