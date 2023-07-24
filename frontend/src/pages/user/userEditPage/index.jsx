import { useState } from "react";

export default function UserEditPage() {
    const [inputs, setInputs] = useState({
        id: "",
        password: "",
        type : "student",
    });
    

    const inputChangeHandler = (e) => {
        // if (e.target.name === 'id') {
        //     return;
        // }

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
                        <h2>회원정보수정</h2>
                    </header>
                    <form action="">
                        <label htmlFor="name">이름 입력</label>
                        <input type="text" name="name" id="name" onChange={inputChangeHandler} value={inputs.name} />
                        <label htmlFor="id">아이디 입력</label>
                        <input type="text" name="id" id="id" onChange={inputChangeHandler} value={inputs.id} />
                        <label htmlFor="password">패스워드 입력 영역</label>
                        <input type="text" name="password" id="password" onChange={inputChangeHandler} value={inputs.password} />

                        
                        <button onClick={buttonClickHandler}>Sign up</button>
                        <button onClick={buttonClickHandler}>Delete Account</button>
                    </form>
                </section>
            </main>
  )
}
