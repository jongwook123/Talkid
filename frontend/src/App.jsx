import { ThemeProvider } from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { theme } from "styles/Theme"
import { GlobalStyle } from "styles/GlobalStyle"

import MainPage from "pages/mainPage"
import SigninPage from "pages/userPages/signinPage"
import SignupPage from "pages/userPages/signupPage"
import UserEditPage from "pages/userPages/userEditPage"
import FindPasswordPage from "pages/userPages/findpasswordPage"

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/modifyuser" element={<UserEditPage />} />
                    <Route path="/findpassword" element={<FindPasswordPage />} />
                    
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}