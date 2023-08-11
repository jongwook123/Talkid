import { ThemeProvider } from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { theme } from "styles/Theme"
import { GlobalStyle } from "styles/GlobalStyle"

import MainPage from "pages/mainPage"

// user pages
import SigninPage from "pages/userPages/signinPage"
import SignupPage from "pages/userPages/signupPage"
import UserEditPage from "pages/userPages/userEditPage"
import FindPasswordPage from "pages/userPages/findpasswordPage"
// import ChattingPages from "pages/chattingPages"

// chatting pages
import ChattingPage from "pages/chattingPage"

// video reference pates
import GroupConferencePage from "pages/groupConferencePage"

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    {/* 사용자 관련 */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/:user/modify" element={<UserEditPage />} />
                    <Route path="/findpassword" element={<FindPasswordPage />} />

                    {/* 채팅, 화상 관련 */}
                    {/* <Route path="/chattingtest" element={<ChattingPages />} /> */}
                    <Route path="/chatting" element={<ChattingPage />} /> 
                    <Route path="/conference" element={<GroupConferencePage />} /> 
                    
                    
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}