
import styled from 'styled-components';


export const Sidebar = styled.section`
  margin:0;
  display: flex;
  flex-direction: column;
  flex: 0.2;
  height: 100vh;
  background-color: #F2F3F5;
    font-size: 30px;
    
`

export const Sidebartop = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #F2F3F5;
    color: black;
    border-bottom: 1px solid #C3CEDA;
    font-size: large;
`

export const Sidebarchannel = styled.article`
    flex:1;
`

export const SidebarchannelHeader = styled.span`
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:10px;
    background-color: #F2F3F5;
    color:black;
    font-size: large;
    
`

export const SidebarHeader = styled.span`
    display: flex;
    align-items: center;
`

export const Sidebaraddchannel = styled.button`
    background-color: #F2F3F5;
    border:none;
    cursor:pointer;
    &:hover {
        color: white;
    }
`

export const SidebarchannelList = styled.article`
`

// export const SidebarVoice = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     color: gray;
//     padding: 10px;
//     border-top: 1px solid #C3CEDA;
//     background-color: #F2F3F5;
// `

// export const SidebarVoiceInfo = styled.div`
//     flex: 1;
//     padding: 10px;
//     color: #4fb185;
//     font-size: large;
//     & > p {
//         font-size:smaller;
//         color: gray;
//         }
// `
// export const SidebarVoiceIcons = styled.div`
   
// `
export const SidebarProfile = styled.article`
   display: flex;
    justify-content: space-between;
    align-items: center;
    color: gray;
    padding: 10px;
    border-top: 1px solid #C3CEDA;
    background-color: #F2F3F5;
`
export const SidebarProfileInfo = styled.span`
   flex:1;
   padding: 10px;
   color: black;
   font-size: large;
   & > p {
    color: gray;
    font-size: smaller;
   }
`

export const SidebarProfileIcon = styled.span`
   flex: 1;

`