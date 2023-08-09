import { useEffect, useRef, useState } from 'react';
import * as S from './style';

const ChatVideo = ({ stream, muted }) => {
    const ref = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (ref.current) {
            ref.current.srcObject = stream;
        }

        if (muted) {
            setIsMuted(muted);
        }
    }, [stream, muted]);

    return (
        <>
            <S.VideoContainer ref={ref} muted={isMuted} autoPlay />
        </>
    );
};

export default ChatVideo;
