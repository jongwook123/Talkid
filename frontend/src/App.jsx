import { ThemeProvider } from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { theme } from "styles/Theme"
import { GlobalStyle } from "styles/GlobalStyle"

// import MainPage from "pages/mainPage"

// user pages
import MainPage from "pages/mainPage/main"
import SigninPage from "pages/userPages/signinPage"
import SignupPage from "pages/userPages/signupPage"
import UserEditPage from "pages/userPages/userEditPage"
import FindPasswordPage from "pages/userPages/findpasswordPage"
// import ChattingPages from "pages/chattingPages"

// chatting pages
import ChattingPage from "pages/chattingPage"

// video reference pates
import GroupConferencePage from "pages/groupConferencePage"

import ProfilePage from "pages/userPages/profilePage"
import GroupPage from "pages/groupPage/groupPage"
import GroupDetailPage from "pages/groupPage/groupDetailPage"
import StudentMatchPage from "pages/matchPage/studentMatchPage"
import TeacherMatchPage from "pages/matchPage/teacherMatchPage"
import GroupApplyPage from "pages/groupPage/groupApplyPage"


export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    {/* 메인 페이지 */}
                    <Route path="/" element={<MainPage />} />
                    
                    {/* 사용자 관련 */}
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/findpassword" element={<FindPasswordPage />} />
                    <Route path="/modify" element={<UserEditPage />} />
                    <Route path="/profile/:memberMail" element={<ProfilePage />} />
                    {/* <Route path="/:user/profile" element={<ProfilePage />} /> */}

                    {/* 채팅, 화상 관련 */}
                    {/* <Route path="/chattingtest" element={<ChattingPages />} /> */}
                    <Route path="/chatting" element={<ChattingPage />} /> 
                    <Route path="/conference" element={<GroupConferencePage />} /> 
                    
                    
                    {/* <Route path="/modifyuser" element={<UserEditPage />} /> */}
                    {/* 그룹 관련 */}
                    <Route path="/group" element={<GroupPage />} />
                    <Route path="/groupdetail/:groupId" element={<GroupDetailPage />} />

                    {/* 매칭 관련 */}
                    <Route path="/match/students" element={<StudentMatchPage />} />
                    <Route path="/match/teachers" element={<TeacherMatchPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}