import styled from "styled-components";
import IROnly from "styles/IROnly";

export const PageHeader = styled.header`
    & > h1 {
        ${IROnly}
    }
`

export const PageMain = styled.main`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

export const FindPasswordSection = styled.section`
    position: absolute;
    width: 620px;
    padding: 80px 50px 80px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid ${props => props.theme.colors.theme.green_light};
    border-radius: ${props => props.theme.border_radius.lv2};
`

export const FindPasswordSectionHeader = styled.header`
    width: fit-content;
    position: absolute;
    padding: 0 20px;
    top: 0;
    left: 50%;
    transform: translate(-50%, calc(-50% - 4px));
    background-color: ${props => props.theme.colors.background_color.white};

    & > h2 {
        ${IROnly}
    }

    & > img {
        width: 400px;
        display: block;
        margin: 0 auto;
    }
`

export const FindPasswordForm = styled.form`
    display: flex;
    flex-direction: column;
    
    & > fieldset + fieldset {
        margin-top: 30px;
    }
`

export const SendWrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin-bottom: 15px;

    & > button {
        margin-left: 10px;
        width: 90%;
        height: 90%;
    }
`

export const ButtonWrapper = styled.div`
    position: absolute;
    width: 520px;
    padding: 0 15px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, calc(50% + 4px));
    background-color: ${props => props.theme.colors.background_color.white};
`