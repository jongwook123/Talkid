import { ThemeProvider } from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { theme } from "styles/Theme"
import { GlobalStyle } from "styles/GlobalStyle"

import MainPage from "pages/mainPage"
import SigninPage from "pages/user/signinPage"
import SignupPage from "pages/user/signupPage"
import UserEditPage from "pages/user/userEditPage"

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/useredit" element={<UserEditPage />} />
                    
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}