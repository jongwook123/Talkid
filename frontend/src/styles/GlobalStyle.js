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
        padding: 0;
    }

    input {
        padding: 0;
    }

    ul, li, ol {
        list-style: none;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`