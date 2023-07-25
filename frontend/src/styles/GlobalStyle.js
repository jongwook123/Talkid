import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}

    *, *::before, *::after {
        box-sizing: border-box;
        font-family: 'Righteous', sans-serif;
        /* font-family: 'Ubuntu', sans-serif; */
    }

    button, a, label {
        cursor: pointer;
    }

    input {
        padding: 0;
    }
`