import { useState } from 'react';

import * as S from './style';

import Videos from './videos';
import Texts from './texts';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import TranslateIcon from '@mui/icons-material/Translate';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import { useEffect } from 'react';

export default function Video({ props: { videoStart, setVideoStart, room, user } }) {
    const [headsetOn, setHeadsetOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);
    const [translateOn, setTranslateOn] = useState(false);
    const [propagate, setPropagate] = useState("");

    useEffect(() => {
        setVideoOn(false);
        setTranslateOn(false);
        setHeadsetOn(false);
    }, [videoStart]);
    
    const onClickHeadset = () => {
        setHeadsetOn(headset => !headset);
    }

    const onClickVideo = () => {
        setVideoOn(video => !video);
    }

    const onClickTranslate = () => {
        setTranslateOn(translate => !translate)
    }

    const onClickVideoOff = () => {
        setVideoStart(false);
    }
    
    return (
        <S.Section videoStart={videoStart}>
            <S.SectionHeader>
                <h3>Video Section</h3>
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
                    <li>
                        <S.ListButtonOff onClick={onClickVideoOff} visible={true}>
                            <PhoneDisabledIcon />
                        </S.ListButtonOff>
                    </li>
                </S.HeaderList>
            </S.SectionHeader>
            {
                videoStart &&
                <>
                    <Videos props={{ propagate, room, nowUser: user, videoOn, headsetOn, translateOn }} />
                    <Texts props={{ setPropagate, nowUser: user }} />
                </>
            }
        </S.Section>
    )
}
