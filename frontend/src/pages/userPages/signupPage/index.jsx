import { useState } from "react"

export default function SignupPage() {
    const [inputs, setInputs] = useState({
        name:"",
        id: "",
        password: "",
        password_confirm:"",
        type : "student",
    });

    const inputChangeHandler = (e) => {

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    console.log(inputs);

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
                    <h2>회원가입 영역</h2>
                </header>
                <form action="">
                    <label htmlFor="name">이름 입력</label>
                    <input type="text" name="name" id="name" onChange={inputChangeHandler} value={inputs.name} />
                    <label htmlFor="id">아이디 입력</label>
                    <input type="text" name="id" id="id" onChange={inputChangeHandler} value={inputs.id} />
                    <label htmlFor="password">패스워드 입력</label>
                    <input type="text" name="password" id="password" onChange={inputChangeHandler} value={inputs.password} />
                    <label htmlFor="password1">패스워드 확인</label>
                    <input type="text" name="password1" id="password1" onChange={inputChangeHandler} value={inputs.password_confirm} />
                    <fieldset>
                        <legend></legend>
                        <input type="radio" name="type" id="student" onChange={inputChangeHandler} value="student" defaultChecked/>
                        <label htmlFor="student">학생</label>
                        <input type="radio" name="type" id="teacher" onChange={inputChangeHandler} value="teacher"/>
                        <label htmlFor="teacher">선생님</label>
                        { 
                            inputs.type === "teacher" && 
                            <>
                                <label htmlFor="license">자격</label>
                                <input type="file" name="license" id="license" accept="image/png, image/jpeg" onChange={inputChangeHandler} value={inputs.license}/>
                            </>
                        }
                    </fieldset>
                    
                    <button onClick={buttonClickHandler}>Sign up</button>
                </form>
            </section>
        </main>
        
    )
}