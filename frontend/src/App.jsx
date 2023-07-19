import { ThemeProvider } from "styled-components"

import { theme } from "styles/Theme"
import { GlobalStyle } from "styles/GlobalStyle"

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <div>Initial State</div>
        </ThemeProvider>
    )
}