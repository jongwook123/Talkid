import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutUser } from 'redux/slice/userSlice';

import { GetUserInfo } from 'apis/UserAPIs';

import * as S from './style';

import TALKIDS from 'assets/images/TALKIDS.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditIcon from '@mui/icons-material/Edit';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';

const colors = ['orange', 'green', 'blue'];

export default function Header() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const color_back = colors[Math.floor(Math.random() * 3)];
    const color1 = colors[Math.floor(Math.random() * 3)];
    const color2 = colors[Math.floor(Math.random() * 3)];
    const color3 = colors[Math.floor(Math.random() * 3)];
    const color4 = colors[Math.floor(Math.random() * 3)];
    
    // 사용자 타입 확인
    const [type, setType] = useState("");

    useEffect(() => {
        const getUserInfo = async (token) => {
            const result = await GetUserInfo(token);

            if (result.success) {
                setType(result.response.memberType.memberTypeName);
            } else {
                navigate("/signin");
            }
        }

        getUserInfo(user.accessToken);
    }, [user, navigate]);

    // 유저 모달
    const [selectUser, setSelectUser] = useState(false);

    const onClickWindow = useCallback(() => {
        setSelectUser(state => state ? false : state);
    }, []);

    const onClickUserButton = (e) => {
        e.stopPropagation();
        setSelectUser(state => !state);
    }

    const onClickButtonList = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {
        window.addEventListener('click', onClickWindow);

        return () => {
            window.removeEventListener('click', onClickWindow);
        }
    }, [onClickWindow]);

    // 로그아웃
    const onClickSignout = () => {
        dispatch(signoutUser());
        navigate('/');
    }

    return (
        <S.Header color={color_back}>
            <h3>
                <Link to="/">
                    <img src={TALKIDS} alt="TALKIDS" />
                </Link>
            </h3>
            <S.HeaderNav>
                <S.NavList>
                    <S.NavListItem visible={true}>
                        <S.NavButton  color={color1}>
                            <NotificationsActiveIcon />
                        </S.NavButton>
                    </S.NavListItem>
                    <S.NavListItem visible={type === "선생님"}>
                        <S.NavLink to='/matching' color={color2}>
                            <CalendarMonthIcon />
                        </S.NavLink>
                    </S.NavListItem>
                    <S.NavListItem visible={true}>
                        <S.NavLink to='/chatting' color={color3}>
                            <ChatIcon />
                        </S.NavLink>
                    </S.NavListItem>
                    <S.NavListItem visible={true}>
                        <S.NavButton color={color4} onClick={onClickUserButton}>
                            <AccountCircleIcon />
                        </S.NavButton>
                        <S.ButtonList onClick={onClickButtonList} visible={selectUser}>
                            <li>
                                <S.ButtinListLink to='/modify' color={color4}>
                                    <EditIcon />
                                    <span>modify</span>
                                </S.ButtinListLink>
                            </li>
                            <li>
                                <p>followers</p>
                            </li>
                            <li>
                                <p>following</p>
                            </li>
                            <li>
                                <p>find user</p>
                            </li>
                            <li>
                                <S.ButtinListButton color={color4} onClick={onClickSignout}>
                                    <LogoutIcon />
                                    <span>sign out</span>
                                </S.ButtinListButton>
                            </li>
                        </S.ButtonList>
                    </S.NavListItem>
                </S.NavList>
            </S.HeaderNav>
        </S.Header>
    )
}
