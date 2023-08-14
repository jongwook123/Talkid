import { useNavigate, useParams } from 'react-router';
import * as S from './style';
import LongButton1 from 'components/buttons/longbutton1';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import AlarmModal from 'components/alarmmodal';
import { useSelector } from 'react-redux';
import { TryFollow, TryGetUser } from 'apis/GetUserAPIs';
import { TryGetFollow } from 'apis/GetUserAPIs';
import { TryGetExp } from 'apis/GetUserAPIs';
import { FindMembers } from 'apis/StudentMatchPageAPIs';
import { useEffect } from 'react';



export default function ProfilePage() {
    const params = useParams(); 
    const token = useSelector(state => state.user.accessToken);
    
    const [user, setUser] = useState({});

    const handleFindUser = async () => {
        const result = await TryGetUser(token);
        setUser({
            ...result.response
        })
    };
       
    const [member, setMember] = useState({});
    const [followers, setFollowers] = useState({})
    const [followings, setFollowings] = useState({})
    const [exp, setExp] = useState({})
    
    const handleFindMember = async () => {
        const memberMail = params.user;

        const result = await FindMembers("all", memberMail);
        
        setMember({
            ...result.response[0],
        })

        // const result1 = await TryGetFollow(token, result.response[0].memberId)

        // console.log(result1);

        // if (Array.isArray(result1.response.Follower)) {
        //     setFollowers(result1.response.Follower);
        // }
        // if (Array.isArray(result1.response.Following)) {
        //     setFollowings(result1.response.Following);
        // }
        // const result2 = await TryGetExp(result.response[0].memberId)
        // console.log(result2)
        // if (Array.isArray(result2.response)) {
        //     setExp(result2.response);
        // }
    } 
    
    useEffect(() => {
        handleFindUser();
        handleFindMember();
    }, []);


    const dummydata = {
        name:'Kim',
        Exp : 10,
        Followers : 238,
        Following : 101,
        Nation : 'Korea',
        Language : 'Korean',
        school : '안녕초',
        Introduce : 'I;;m~~~~~flsdlkfajfisfjfaf',
        user : 'me',
        type : 2

    }

    const calculateExpBarWidth = (exp) => {
        const maxExp = 100; // 최대 경험치 값

        if ((exp / maxExp) * 100 <= 20) {
            return 20 + '%'
        }
        return (exp / maxExp) * 100 + '%';
    };

    const navigate = useNavigate();

    const EditClickHandler = () => {
        navigate('/modify');
    }

    const [isOpen, setIsOpen] = useState(false);
    const open = () => {
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };
    // const confirm = () => {
    //     console.log("confirm clicked");
    //     setIsOpen(false);
    // };

    const FollowClickHandler = async () => {
        const memberMail = params.memberMail;
        const result = await FindMembers("all", memberMail);
        setMember({
            ...result.response[0]
        })
        const result1 = await TryFollow(result.response[0].memberId,token)
        
        
    }

    const isFollowing = Array.isArray(followers) && followers.some(follower => follower.followMemberName === user.memberMail);

    return (
            <>
            <S.PageHeader>
                <h1>TALKIDS</h1>
            </S.PageHeader>
            <S.Body>
                <S.BodyHeader>
                    <h2>버튼 삽입</h2>
                    {member.memberId === user.memberId ? (
                    <S.ButtonWrapper1>
                        <LongButton1 props={{ color: "#8EA3BC", text: "Edit", callback: EditClickHandler }} />
                        <NotificationsIcon sx={{ fontSize: 48,cursor: 'pointer' }} onClick={open}/>
                        {isOpen && (
                            <AlarmModal
                            title="알림"
                            message="알림내역을 보여드립니다 와우와우"
                            close={close}
                            ></AlarmModal>
                        )}
                    </S.ButtonWrapper1>
                    ) : 
                    (<S.ButtonWrapper2>
                        {isFollowing ? (
                            <LongButton1 props={{ c1olor: "#8EA3BC", text: "unFollow", callback: FollowClickHandler }} />
                        ) : (
                            <LongButton1 props={{ color: "#8EA3BC", text: "Follow", callback: FollowClickHandler }} />
                        )}
                        <LongButton1 props={{ color: "#8EA3BC", text: "Message", callback: 'buttonClickHandler' }} />
                    </S.ButtonWrapper2>
                    )}
                    
                    
                </S.BodyHeader>
                <S.PageBody>
                    <h2>프로필 내용 영역</h2>
                    <S.LeftBody>
                        <h3>왼쪽바디</h3>
                        <S.Pic src="https://cdn.pixabay.com/photo/2020/04/28/19/36/heart-5106075_960_720.png" alt="15616" />
                        <S.Name>{member.memberName}</S.Name>
                        <S.Exptitle>
                            EXP
                        </S.Exptitle>
                        <S.ExpBarBackground>
                            <S.ExpBar style={{ width: calculateExpBarWidth({exp})}}/>
                        </S.ExpBarBackground>
                        <S.Follow>
                            <S.Followers>
                                Follwers
                                <p>{followers.length}</p>
                            </S.Followers>
                            <S.Following>
                                Folllowing
                                <p>{followings.length}</p>
                            </S.Following>
                        </S.Follow>
                    </S.LeftBody>
                    <S.RightBody>
                        <h3>오른쪽바디</h3>
                        {member.memberType && member.memberType.memberTypeId === 1 && (
                            <S.Title>
                                {member.memberType && member.memberType.memberTypeName}
                            </S.Title>
                        )}
                        <S.Title>
                            Nation
                        </S.Title>
                        <S.Info>
                            {member.country && member.country.countryName}
                        </S.Info>
                        <S.Title>
                            Language
                        </S.Title>
                        <S.Info>
                            {member.language && member.language.languageEng}
                        </S.Info>
                        {member.memberType && member.memberType.memberTypeId === 1 && (
                        <>
                            <S.Title>
                                School
                            </S.Title>
                            <S.Info>
                                {member.school && member.school.schoolName}
                            </S.Info>
                        </>
                        )}
                        {member.memberType && member.memberType.memberTypeId === 2 && (
                        <>
                            <S.Title>
                                Introduction
                            </S.Title>
                            <S.Info>
                                {member.memberIntroduce}
                            </S.Info>
                        </>
                        )}
                    </S.RightBody>
                </S.PageBody>
            </S.Body>
            <footer></footer>
            </>
    );
}