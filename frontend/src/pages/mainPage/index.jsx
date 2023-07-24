import styled from "styled-components"

import DropBox1 from "components/dropboxes/dropbox1/DropBox1"
import { useEffect, useState } from "react"

const Wrapper = styled.div`
    background-color: ${props => props.theme.colors.theme.light_green};
`

const testList = [1, 2, 3, 4, 5];

export default function MainPage() {
    const [test, setTest] = useState("");

    useEffect(() => {
        setTest(testList[0]);
    }, [])

    return (
        <Wrapper>
            <DropBox1 props={{ list: testList, target: test, callback: setTest }} />
        </Wrapper>
    )
}
