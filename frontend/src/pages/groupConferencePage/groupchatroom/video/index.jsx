import { useState } from 'react';

import * as S from './style';

import Videos from './videos';
import Texts from './texts';

import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import TranslateIcon from '@mui/icons-material/Translate';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';

export default function Video({ props: { room, user } }) {
    const [headsetOn, setHeadsetOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);
    const [translateOn, setTranslateOn] = useState(false);
    const [propagate, setPropagate] = useState("");
    
    const onClickHeadset = () => {
        setHeadsetOn(headset => !headset);
    }

    const onClickVideo = () => {
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
                            <HeadsetIcon />
                        </S.ListButtonNormal>
                    </li>
                    <li>
                        <S.ListButtonOff onClick={onClickHeadset} visible={!headsetOn}>
                            <HeadsetOffIcon />
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
                    {/* <Videos props={{ propagate, room, nowUser: user, videoOn, headsetOn, translateOn }} />
                    <Texts props={{ setPropagate }} /> */}
                </>
            }
        </S.Section>
    )
}
