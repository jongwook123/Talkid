import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUser } from "redux/slice/userSlice";

import { GetUserInfo, GetFollow, TryFollow } from "apis/UserAPIs";

import * as S from "./style";

import TALKIDS from "assets/images/TALKIDS.png";

import DropBox2 from "components/dropboxes/dropbox2";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutIcon from "@mui/icons-material/Logout";

const colors = ["orange", "green", "blue"];

export default function Header() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const color_back = colors[Math.floor(Math.random() * 3)];
    const color1 = colors[Math.floor(Math.random() * 3)];
    const color2 = colors[Math.floor(Math.random() * 3)];
    const color3 = colors[Math.floor(Math.random() * 3)];
    const color4 = colors[Math.floor(Math.random() * 3)];
    const color5 = colors[Math.floor(Math.random() * 3)];

    // 웹 소켓, 알람
    const socketRef = useRef(null);
    const [notifys, setNotifys] = useState([]);

    useEffect(() => {
        if (!user.accessToken) {
            navigate("/signin");

            return;
        }

        // // 서버에 웹 소켓 올리면 하기
        socketRef.current = new WebSocket(
            "ws://" +
            process.env.REACT_APP_BASE_SERVER.replace("https://", "").replace(
                "/api",
                ""
            ) +
            "/ws"
        );

        socketRef.current.onopen = () => {
            socketRef.current.send(
                JSON.stringify({
                    command: "Authorization",
                    Authorization: `Bearer ${user.accessToken}`,
                })
            );
        };

        socketRef.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);

            if (data.command === "newNotify") {
                const { notifyContentId, notifyHeader, notifyBody, checked } = data;

                setNotifys((prev) => [
                    ...prev,
                    { notifyContentId, notifyHeader, notifyBody, checked },
                ]);
            }
        };
    }, [user, navigate]);

    // 사용자 타입 확인
    const [type, setType] = useState("");

    useEffect(() => {
        if (!user.accessToken) {
            navigate("/signin");

            return;
        }

        const getUserInfo = async (token) => {
            const result = await GetUserInfo(token);

            if (result.success) {
                setType(result.response.memberType.memberTypeName);
            } else {
                navigate("/signin");
            }
        };

        getUserInfo(user.accessToken);
    }, [user, navigate]);

    // 모달
    const [selectUser, setSelectUser] = useState(false);
    const [selectGroup, setSelectGroup] = useState(false);
    const [selectNotify, setSelectNotify] = useState(false);
    const [selectFollow, setSelectFollow] = useState(false);

    // 윈도우 클릭
    const onClickWindow = useCallback(() => {
        setSelectUser(false);
        setSelectGroup(false);
        setSelectNotify(false);
        setSelectFollow(false);
    }, []);

    // 유저 버튼 클릭
    const onClickUserButton = (e) => {
        e.stopPropagation();
        setSelectUser((state) => !state);
        setSelectGroup(false);
    };

    // 그룹 버튼 클릭
    const onClickGroupButton = (e) => {
        e.stopPropagation();
        setSelectUser(false);
        setSelectGroup((state) => !state);
    };

    // 알람 버튼 클릭
    const onClickNotify = (e) => {
        e.stopPropagation();
        setSelectUser(false);
        setSelectGroup(false);
        setSelectNotify(true);
        setSelectFollow(false);
    };

    // 알람 wrapper 클릭
    const onClickWrapper = (e) => {
        setSelectNotify(false);
        setSelectFollow(false);
    };

    // modal body 클릭
    const onClickBody = (e) => {
        e.stopPropagation();
    };

    // modal close button 클릭
    const onClickModalClose = (e) => {
        setSelectNotify(false);
        setSelectFollow(false);
    };

    // 헤더 링크 클릭
    const onClickLink = () => {
        setSelectUser(false);
        setSelectGroup(false);
        setSelectNotify(false);
        setSelectFollow(false);
    };

    useEffect(() => {
        window.addEventListener("click", onClickWindow);

        return () => {
            window.removeEventListener("click", onClickWindow);
        };
    }, [onClickWindow]);

    // 팔로워 모달
    const [followTab, setFollowTab] = useState("followers");
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    const onClickFollowerButton = () => {
        setFollowTab("followers");
    };

    const onClickFollowingButton = () => {
        setFollowTab("following");
    };

    const getUserFollow = async () => {
        if (!user.accessToken) {
            navigate("/signin");

            return;
        }

        const result = await GetFollow(user.accessToken);

        if (result.success) {
            setFollowing(result.response.Following);
            setFollowers(result.response.Follower);
        } else {
            navigate("/signin");
        }
    };

    useEffect(() => {
        getUserFollow(user.accessToken);
    }, [user, navigate]);

    // 팔로워 버튼 클릭
    const onClickFollower = (e) => {
        e.stopPropagation();
        setSelectUser(false);
        setSelectGroup(false);
        setSelectNotify(false);
        setSelectFollow(true);

        getUserFollow();
    };

    const onClickUnfollow = async (memberId) => {
        await TryFollow(user.accessToken, memberId);

        setFollowing(
            following.filter((follow) => follow.followMemberId != memberId)
        );
    };

    const onClickFollowChat = async (followMail) => {
        const result = await GetUserInfo(user.accessToken);

        setSelectFollow(false);
        navigate("/chatting", {
            state: {
                sender: result.response.memberMail,
                receiver: followMail,
            },
        });
    };

    // 로그아웃
    const onClickSignout = () => {
        dispatch(signoutUser());
        navigate("/");
    };

    return (
        <S.Header color={color_back}>
            <h1>
                <Link to="/">
                    <img src={TALKIDS} alt="TALKIDS" />
                </Link>
            </h1>
            <S.HeaderNav>
                <S.NavList>
                    <S.NavListItem visible={true}>
                        <S.NavButton onClick={onClickNotify} color={color1}>
                            <NotificationsActiveIcon />
                        </S.NavButton>
                        <S.ModalWrapper onClick={onClickWrapper} visible={selectNotify}>
                            <S.AlarmModal onClick={onClickBody}>
                                <S.AlarmModalHeader color={color1}>Alarms</S.AlarmModalHeader>
                                <S.AlarmModalList color={color1}>
                                    {notifys.map((notify) => {
                                        if (notify.notifyType === "MATCHING") {
                                            return (
                                                <li key={notify.notifyContentId}>
                                                    <DropBox2
                                                        props={{
                                                            title: notify.notifyHeader,
                                                            content: notify.notifyBody,
                                                            color: color1,
                                                        }}
                                                    />
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={notify.notifyContentId}>
                                                    <DropBox2
                                                        props={{
                                                            title: notify.notifyHeader,
                                                            content: notify.notifyBody,
                                                            color: color1,
                                                        }}
                                                    />
                                                </li>
                                            )
                                        }
                                        
                                    })}
                                </S.AlarmModalList>
                                <S.AlarmModalButton onClick={onClickModalClose} color={color1}>
                                    close
                                </S.AlarmModalButton>
                            </S.AlarmModal>
                        </S.ModalWrapper>
                    </S.NavListItem>
                    <S.NavListItem visible={type === "선생님"}>
                        <S.NavLink to="/matching" color={color2}>
                            <CalendarMonthIcon />
                        </S.NavLink>
                    </S.NavListItem>
                    <S.NavListItem visible={true}>
                        <S.NavLink to="/chatting" color={color3}>
                            <ChatIcon />
                        </S.NavLink>
                    </S.NavListItem>
                    <S.NavListItem visible={true}>
                        <S.NavButton color={color5} onClick={onClickGroupButton}>
                            <GroupIcon />
                        </S.NavButton>
                        <S.ButtonList onClick={onClickBody} visible={selectGroup}>
                            <li>
                                <S.ButtinListLink
                                    to="/group"
                                    onClick={onClickLink}
                                    color={color5}
                                >
                                    <GroupsIcon />
                                    <span>Group</span>
                                </S.ButtinListLink>
                            </li>
                            <li>
                                <S.ButtinListLink
                                    to="/finduser"
                                    onClick={onClickLink}
                                    color={color5}
                                >
                                    <PersonSearchIcon />
                                    <span>Connect</span>
                                </S.ButtinListLink>
                            </li>
                        </S.ButtonList>
                    </S.NavListItem>
                    <S.NavListItem visible={true}>
                        <S.NavButton color={color4} onClick={onClickUserButton}>
                            <AccountCircleIcon />
                        </S.NavButton>
                        <S.ButtonList onClick={onClickBody} visible={selectUser}>
                            <li>
                                <S.ButtinListLink to="/modify" color={color4}>
                                    <EditIcon />
                                    <span>modify</span>
                                </S.ButtinListLink>
                            </li>
                            <li>
                                <S.ButtinListButton color={color4} onClick={onClickFollower}>
                                    <Diversity3Icon />
                                    <span>followers</span>
                                </S.ButtinListButton>
                            </li>
                            <li>
                                <S.ButtinListButton color={color4} onClick={onClickSignout}>
                                    <LogoutIcon />
                                    <span>sign out</span>
                                </S.ButtinListButton>
                            </li>
                        </S.ButtonList>
                        <S.ModalWrapper onClick={onClickWrapper} visible={selectFollow}>
                            <S.FollowModal onClick={onClickBody}>
                                <h2>follower tab</h2>
                                <S.FollowTabWrapper>
                                    <S.FollowTabButton
                                        onClick={onClickFollowerButton}
                                        selected={followTab === "followers"}
                                        color={color4}
                                    >
                                        Followers
                                    </S.FollowTabButton>
                                    <S.FollowTabButton
                                        onClick={onClickFollowingButton}
                                        selected={followTab === "following"}
                                        color={color4}
                                    >
                                        Following
                                    </S.FollowTabButton>
                                </S.FollowTabWrapper>
                                <S.FollowListWrapper>
                                    <S.FollowList selected={followTab === "followers"}>
                                        {followers.map((follow) => {
                                            return (
                                                <S.FollowListItem key={follow.followMemberName}>
                                                    <S.TextWrapper color={color4}>
                                                        <p>{follow.followMemberMail}</p>
                                                        <p>{follow.followMemberName}</p>
                                                    </S.TextWrapper>
                                                    <S.ChatButton
                                                        onClick={() => {
                                                            onClickFollowChat(follow.followMemberName);
                                                        }}
                                                        color={color4}
                                                    >
                                                        <ChatIcon />
                                                    </S.ChatButton>
                                                </S.FollowListItem>
                                            );
                                        })}
                                    </S.FollowList>
                                    <S.FollowList selected={followTab === "following"}>
                                        {following.map((follow) => {
                                            return (
                                                <S.FollowListItem key={follow.followMemberName}>
                                                    <S.TextWrapper color={color4}>
                                                        <p>{follow.followMemberMail}</p>
                                                        <p>{follow.followMemberName}</p>
                                                    </S.TextWrapper>
                                                    <S.ChatButton
                                                        onClick={() => {
                                                            onClickFollowChat(follow.followMemberName);
                                                        }}
                                                        color={color4}
                                                    >
                                                        <ChatIcon />
                                                    </S.ChatButton>
                                                    <S.UnfollowButton
                                                        onClick={() => {
                                                            onClickUnfollow(follow.followMemberId);
                                                        }}
                                                        color={color4}
                                                    >
                                                        unfollow
                                                    </S.UnfollowButton>
                                                </S.FollowListItem>
                                            );
                                        })}
                                    </S.FollowList>
                                </S.FollowListWrapper>
                            </S.FollowModal>
                        </S.ModalWrapper>
                    </S.NavListItem>
                </S.NavList>
            </S.HeaderNav>
        </S.Header>
    );
}
