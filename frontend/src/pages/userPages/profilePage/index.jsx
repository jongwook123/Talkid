import { useNavigate } from 'react-router';
import * as S from './style';
import LongButton1 from 'components/buttons/longbutton1';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import AlarmModal from 'components/alarmmodal';



export default function ProfilePage() {
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
        navigate('/modifyuser');
    }

    const [isOpen, setIsOpen] = useState(false);
    const open = () => {
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };
    const confirm = () => {
        console.log("confirm clicked");
        setIsOpen(false);
    };

    

    return (
        <>
        {dummydata.type === 1 && (
            <>
            <S.PageHeader>
                <h1>TALKIDS</h1>
            </S.PageHeader>
            <S.Body>
                <S.BodyHeader>
                    <h2>버튼 삽입</h2>
                    {dummydata.user === 'me' && (
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
                    )}
                    {dummydata.user !== 'me' && (
                    <S.ButtonWrapper2>
                        <LongButton1 props={{ color: "#8EA3BC", text: "Follow", callback: 'buttonClickHandler' }} />
                        <LongButton1 props={{ color: "#8EA3BC", text: "Message", callback: 'buttonClickHandler' }} />
                    </S.ButtonWrapper2>
                    )}
                    
                    
                </S.BodyHeader>
                <S.PageBody>
                    <h2>프로필 내용 영역</h2>
                    <S.LeftBody>
                        <h3>왼쪽바디</h3>
                        <S.Pic src="https://cdn.pixabay.com/photo/2020/04/28/19/36/heart-5106075_960_720.png" alt="15616" />
                        <S.Name>{dummydata.name}</S.Name>
                        <S.Exptitle>
                            EXP
                        </S.Exptitle>
                        <S.ExpBarBackground>
                            <S.ExpBar style={{ width: calculateExpBarWidth(dummydata.Exp)}}/>
                        </S.ExpBarBackground>
                        <S.Follow>
                            <S.Followers>
                                Follwers
                                <p>{dummydata.Followers}</p>
                            </S.Followers>
                            <S.Following>
                                Folllowing
                                <p>{dummydata.Following}</p>
                            </S.Following>
                        </S.Follow>
                    </S.LeftBody>
                    <S.RightBody>
                        <h3>오른쪽바디</h3>
                        <S.Title>
                            Nation
                        </S.Title>
                        <S.Info>
                            {dummydata.Nation}
                        </S.Info>
                        <S.Title>
                            Language
                        </S.Title>
                        <S.Info>
                            {dummydata.Language}
                        </S.Info>
                        <S.Title>
                            School
                        </S.Title>
                        <S.Info>
                            {dummydata.school}
                        </S.Info>
                    </S.RightBody>
                </S.PageBody>
            </S.Body>
            <footer></footer>
            </>
            )}

            {dummydata.type === 2 && (
            <>
            <S.PageHeader>
                <h1>TALKIDS</h1>
            </S.PageHeader>
            <S.Body>
                <S.BodyHeader>
                    <h2>버튼 삽입</h2>
                    {dummydata.user === 'me' && (
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
                    )}
                    {dummydata.user !== 'me' && (
                    <S.ButtonWrapper2>
                        <LongButton1 props={{ color: "#8EA3BC", text: "Follow", callback: 'buttonClickHandler' }} />
                        <LongButton1 props={{ color: "#8EA3BC", text: "Message", callback: 'buttonClickHandler' }} />
                    </S.ButtonWrapper2>
                    )}
                    
                    
                </S.BodyHeader>
                <S.PageBody>
                    <h2>프로필 내용 영역</h2>
                    <S.LeftBody>
                        <h3>왼쪽바디</h3>
                        <S.Pic src="https://cdn.pixabay.com/photo/2020/04/28/19/36/heart-5106075_960_720.png" alt="15616" />
                        <S.Name>{dummydata.name}</S.Name>
                        <S.Exptitle>
                            EXP
                        </S.Exptitle>
                        <S.ExpBarBackground>
                            <S.ExpBar style={{ width: calculateExpBarWidth(dummydata.Exp)}}/>
                        </S.ExpBarBackground>
                        <S.Follow>
                            <S.Followers>
                                Follwers
                                <p>{dummydata.Followers}</p>
                            </S.Followers>
                            <S.Following>
                                Folllowing
                                <p>{dummydata.Following}</p>
                            </S.Following>
                        </S.Follow>
                    </S.LeftBody>
                    <S.RightBody>
                        <h3>오른쪽바디</h3>
                        <S.Title>
                            Nation
                        </S.Title>
                        <S.Info>
                            {dummydata.Nation}
                        </S.Info>
                        <S.Title>
                            Language
                        </S.Title>
                        <S.Info>
                            {dummydata.Language}
                        </S.Info>
                        <S.Title>
                            About Me
                        </S.Title>
                        <S.Info>
                            {dummydata.Introduce}
                        </S.Info>
                    </S.RightBody>
                </S.PageBody>
            </S.Body>
            <footer></footer>
            </>
            )}
        </>
        
    )
}