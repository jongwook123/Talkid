import { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function usePrevious(value) {
    const ref = useRef();

    ref.current = value;

    return ref.current;
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function Texts({ props: { setPropagate } }) {
    const {
        transcript,
        // listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [translate, setTranslate] = useState("");

    const [prevText, setPrevText] = useState("");
    const prev = usePrevious({ prevText, setPrevText });

    const [epmtyCount, setEmptyCount] = useState(0);

    useInterval(() => {
        if (transcript === "") {
            return;
        }

        if (prev.prevText === transcript) {
            if (epmtyCount < 2) {
                setEmptyCount(epmtyCount => epmtyCount + 1)

                return;
            }

            resetTranscript();
            setTranslate("");
            setEmptyCount(0);
            prev.setPrevText("");
        } else {
            const translate = async () => {
                const response = await fetch(process.env.REACT_APP_TRANSLATION_SERVER + '/ko/en/' + transcript);
                const result = await response.json();

                setTranslate(result.translated);
            }

            translate();
            prev.setPrevText(transcript);
        }
    }, 1000);

    useEffect(() => {
        setPropagate(translate);
    }, [translate, setPropagate]);

    useEffect(() => {
        SpeechRecognition.startListening({ continuous: true, language: 'ko' });

        return (() => {
            SpeechRecognition.stopListening();
        });
    }, []);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <></>
    )
}
