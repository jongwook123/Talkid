import { useRef, useState } from "react"

export default function SigninPage() {
    const [inputs, setInputs] = useState({
        id: "",
        password: "",
    });
    const inputsRef = useRef([]);

    const inputChangeHandler = (e) => {
        if (e.target.name === 'id') {
            return;
        }

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value, 
        });
    }

    return (
        <form action="">
            <input type="text" name="id" onChange={inputChangeHandler} ref={(element) => inputsRef.current[0] = element} value={inputs.id} />
            <input type="text" name="password" onChange={inputChangeHandler} ref={(element) => inputsRef.current[1] = element} value={inputs.password}/>
        </form>
    )
}
