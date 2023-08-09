import { ThemeProvider } from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { theme } from "styles/Theme"
import { GlobalStyle } from "styles/GlobalStyle"

import MainPage from "pages/mainPage/main"
import SigninPage from "pages/userPages/signinPage"
import SignupPage from "pages/userPages/signupPage"
import UserEditPage from "pages/userPages/userEditPage"
import FindPasswordPage from "pages/userPages/findpasswordPage"
import ProfilePage from "pages/userPages/profilePage"
import GroupPage from "pages/groupPage/groupPage"
import GroupDetailPage from "pages/groupPage/groupDetailPage"
import StudentMatchPage from "pages/matchPage/studentMatchPage"
import TeacherMatchPage from "pages/matchPage/teacherMatchPage"








export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/modifyuser" element={<UserEditPage />} />
                    <Route path="/findpassword" element={<FindPasswordPage />} />
                    <Route path="/group" element={<GroupPage />} />
                    <Route path="/groupdetail/:groupId" element={<GroupDetailPage />} />
                    <Route path="/match/students" element={<StudentMatchPage />} />
                    <Route path="/match/teachers" element={<TeacherMatchPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}