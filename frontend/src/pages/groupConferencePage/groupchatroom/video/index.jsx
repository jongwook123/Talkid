import { useState } from 'react';

import * as S from './style';

import Videos from './videos';
import Texts from './texts';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import TranslateIcon from '@mui/icons-material/Translate';

export default function Video({ props: { room, user, groupId } }) {
    const [headsetOn, setHeadsetOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);
    const [translateOn, setTranslateOn] = useState(false);
    const [propagate, setPropagate] = useState("");

    useEffect(() => {
        setVideoOn(false);
        setTranslateOn(false);
        setHeadsetOn(false);
    }, [room]);
    
    const onClickHeadset = () => {
        if (room === groupId && user.memberType.memberTypeId === 2) {
            return;
        }

        setHeadsetOn(headset => !headset);
    }

    const onClickVideo = () => {
        if (room === groupId && user.memberType.memberTypeId === 2) {
            return;
        }

        setVideoOn(video => !video);
    }

    const onClickTranslate = () => {
        setTranslateOn(translate => !translate)
    }
    
    return (
        <S.Section videoStart={true}>
            <S.SectionHeader>
                <h3>화상 회의 영역</h3>
                <S.HeaderList>
                    <li>
                        <S.ListButtonNormal onClick={onClickHeadset} visible={headsetOn}>
                            <MicIcon />
                        </S.ListButtonNormal>
                    </li>
                    <li>
                        <S.ListButtonOff onClick={onClickHeadset} visible={!headsetOn}>
                            <MicOffIcon />
                        </S.ListButtonOff>
                    </li>
                    <li>
                        <S.ListButtonNormal onClick={onClickVideo} visible={videoOn}>
                            <VideocamIcon />
                        </S.ListButtonNormal>
                    </li>
                    <li>
                        <S.ListButtonOff onClick={onClickVideo} visible={!videoOn}>
                            <VideocamOffIcon />
                        </S.ListButtonOff>
                    </li>
                    <li>
                        <S.ListButtonTranslate onClick={onClickTranslate} visible={true} isOn={translateOn}>
                            <TranslateIcon />
                        </S.ListButtonTranslate>
                    </li>
                </S.HeaderList>
            </S.SectionHeader>
            {
                <>
                    <Videos props={{ propagate, room, nowUser: user, videoOn, headsetOn, translateOn }} />
                    <Texts props={{ setPropagate, nowUser: user }} />
                </>
            }
        </S.Section>
    )
}
