import { useEffect, useState } from "react"

import styled from "styled-components"

import DropBox1 from "components/dropboxes/dropbox1"
import LongButton1 from "components/buttons/longbutton1"
import LongInput1 from "components/inputs/longinput1"

const Wrapper = styled.div`
    background-color: ${props => props.theme.colors.theme.light_green};
`

const testList = [1, 2, 3, 4, 5];

export default function MainPage() {
    // dropbox 사용
    const [test, setTest] = useState("");

    useEffect(() => {
        setTest(testList[0]);
    }, [])

    // input 사용
    const [input, setInput] = useState({
        test: ""
    });

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <Wrapper>
            <i className="far fa-envelope"></i>
            <i className="fas fa-envelope"></i>
            <i class="fas fa-times"></i>
            <LongButton1 props={{ color: 'orange', text: 'asdf' }} />
            <DropBox1 props={{ list: testList, target: test, callback: setTest }} />
            <LongInput1 props={{ id: "test", desc: "test", color: "blue", placeholder: "test", value: input.test, callback: onChangeHandler }} />
        </Wrapper>
    )
}
