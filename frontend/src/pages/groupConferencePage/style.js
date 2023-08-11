import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Main = styled.main`

`

export const SectionChat = styled.section`
    height: 100vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background_color.white};
`

export const HeaderChat = styled.header`
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 20px 0 30px;
    background-color: ${props => props.theme.colors.theme.blue_light3};

    & > h2 {
        display: block;
        margin-right: auto;
        font-size: ${props => props.theme.font_size.lv4};
    }
`

export const HeaderButton = styled.button`
    border: 0;
    padding: 0;
    background-color: inherit;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    display: ${props => props.visible ? 'flex' : 'none'};
`

export const HeaderButtonNormal = styled(HeaderButton)`
    color: ${props => props.theme.colors.theme.green_dark};
`

export const HeaderButtonVideo = styled(HeaderButton)`
    color: ${props => props.theme.colors.theme.orange_dark};
`

export const DictionaryWrapper = styled.div`
    height: calc(100vh - 48px);
    display: flex;
`

export const VideoWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

export const ListChat = styled.ul`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0 30px 25px 30px;
    overflow-y: scroll;
    gap: 2px;

    &::-webkit-scrollbar {
        display: none;
        width: 8px;
        background-color: ${props => props.theme.colors.theme.blue_light3};
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.theme.blue};
        border-radius: 10px;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
`

export const ChatWrapper = styled.li`
    display: flex;
    flex-direction: column;
`

export const Datewrapper = styled.time`
    margin: 20px auto;
    color: ${props => props.theme.colors.font.light_gray};
    font-size: ${props => props.theme.font_size.lv3};
`

export const MyChatWrapper = styled.div`
    margin-left: auto;

    &:hover > div > div > button {
        display: block;
    }
`

export const OppositeChatWrapper = styled.div`
    margin-right: auto;
`

const UserName = styled.p`
    margin-top: 12px;
    margin-bottom: 7px;
    color: ${props => props.theme.colors.font.light_black};
    font-size: ${props => props.theme.font_size.lv3_1};
`

export const MyUserName = styled(UserName)`
    text-align: right;
`

export const OppositeUserName = styled(UserName)`
    text-align: left;
`

export const TimeWrapper = styled.div`
    display: flex;
`

export const Chat = styled.p`
    position: relative;
    max-width: 300px;
    padding: 12px;
    border-radius: ${props => props.theme.border_radius.lv3};
    color: ${props => props.theme.colors.font.white};
    font-size: ${props => props.theme.font_size.lv3_1};
`

export const MyChat = styled(Chat)`
    background-color: ${props => props.theme.colors.theme.orange_dark};

    &::after {
        content: '';
        border-top: 12px solid ${props => props.theme.colors.theme.orange_dark};
        border-right: 20px solid transparent;
        border-left: 0px solid transparent;
        border-bottom: 0px solid transparent;
        position: absolute;
        right: -12px;
        bottom: 6px;
    }
`

export const OppositeChat = styled(Chat)`
    background-color: ${props => props.theme.colors.theme.green};

    &::after {
        content: '';
        border-top: 12px solid ${props => props.theme.colors.theme.green};
        border-right: 0px solid transparent;
        border-left: 20px solid transparent;
        border-bottom: 0px solid transparent;
        position: absolute;
        left: -12px;
        bottom: 6px;
    }
`

export const TranslateWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const TranslateButton = styled.button`
    display: none;
    border: none;
    background-color: inherit;
    margin-top: auto;
    margin-bottom: 3px;
    color: ${props => props.theme.colors.font.light_gray2};
    font-size: ${props => props.theme.font_size.lv2};
`

export const TranslateText = styled.p`
    width: fit-content;
    max-width: 300px;
    padding: 12px;
    margin-top: 2px;
    margin-bottom: 5px;
    background-color: ${props => props.theme.colors.theme.blue};
    border-radius: ${props => props.theme.border_radius.lv3};
    color: ${props => props.theme.colors.font.white};
    font-size: ${props => props.theme.font_size.lv3_1};
`

export const TranslateTextMy = styled(TranslateText)`
    margin-left: auto;
`

export const TranslateTextOpposite = styled(TranslateText)`
    margin-right: auto;
`

export const Time = styled.time`
    color: ${props => props.theme.colors.font.light_gray2};
    font-size: ${props => props.theme.font_size.lv2};
    margin: auto 5px 3px 5px;
`

export const FormWrapper = styled.div`
    /* background-color: ${props => props.theme.colors.theme.blue_light}; */
`

export const FormChat = styled.form`
    display: flex;
    margin: 5px 20px 20px 20px;
    padding: 10px 20px;
    background-color: ${props => props.theme.colors.theme.blue_light};
    border-radius: ${props => props.theme.border_radius.lv3};

    & > label {
        ${IROnly}
    }
`

export const FormInput = styled.input`
    flex-grow: 1;
    border: none;
    font-size: ${props => props.theme.font_size.lv3_1};
    background-color: inherit;
    color: ${props => props.theme.colors.font.white};

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${props => props.theme.colors.font.white};
    }
`

export const FormButton = styled.button`
    border: none;
    padding: 6px 10px;
    background-color: ${props => props.theme.colors.theme.blue_dark};
    border-radius: ${props => props.theme.border_radius.lv2};
    color: ${props => props.theme.colors.font.white};
`