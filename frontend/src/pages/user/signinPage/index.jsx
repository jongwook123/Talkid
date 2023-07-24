import { useState } from "react"


export default function SigninPage() {
    const [inputs, setInputs] = useState({
        id: "",
        password: "",
    });

    const inputChangeHandler = (e) => {

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const buttonClickHandler = (e) => {
        e.preventDefault();

        console.log(inputs);
        
        if (!inputs.id) {
            return alert("ID를 입력하세요.")
        } else if (!inputs.password) {
            return alert("Password를 입력하세요.")
        }
        
    }

    return (
        <main>
            <section>
                <header>
                    <h2>로그인 영역</h2>
                </header>
                <form action="">
                    <label htmlFor="id">아이디 입력</label>
                    <input type="text" name="id" id="id" onChange={inputChangeHandler} value={inputs.id} />
                    <label htmlFor="password">패스워드 입력 영역</label>
                    <input type="text" name="password" id="password" onChange={inputChangeHandler} value={inputs.password} />
                    <button onClick={buttonClickHandler}>Sign in</button>
                </form>
            </section>
        </main>
        
    )
}
