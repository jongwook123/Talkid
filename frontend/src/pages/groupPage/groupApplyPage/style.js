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

export const InputSection = styled.section`
    display: grid;
    grid-template-columns: 5fr 1fr;
`

export const GroupApplySection = styled.section`
    position: absolute;
    width: 620px;
    padding: 70px 50px 90px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid ${props => props.theme.colors.theme.green_light};
    border-radius: ${props => props.theme.border_radius.lv2};
`

export const GroupApplySectionHeader = styled.header`
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

export const GroupApplyForm = styled.form`
    display: flex;
    flex-direction: column;
    
    & > fieldset + fieldset {
        margin-top: 30px;
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