import React from "react";
import * as S from './style';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from "./sidebarchannel";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';

import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from "@mui/material";

function Sidebar() {
    return(
        <S.Sidebar>
            <S.Sidebartop>
                Clever Programmer
                <KeyboardArrowDownIcon/>
            </S.Sidebartop>
            <S.Sidebarchannel>
                <S.SidebarchannelHeader>
                    <S.SidebarHeader>
                        <KeyboardArrowDownIcon/>
                        참가자
                    </S.SidebarHeader>
                            <S.Sidebaraddchannel>
                                <AddIcon/>
                            </S.Sidebaraddchannel>
                </S.SidebarchannelHeader>
                <S.SidebarchannelList>
                    <SidebarChannel/>
                    <SidebarChannel/>
                    <SidebarChannel/>
                </S.SidebarchannelList>
            </S.Sidebarchannel>
            {/* <S.SidebarVoice>
                <SignalCellularAltIcon style={{color:"#4fb185"}} fontSize="large"/>
                <S.SidebarVoiceInfo>
                    Voice connected
                    <p>Stream</p>
                </S.SidebarVoiceInfo>
                <S.SidebarVoiceIcons>
                    <InfoOutlinedIcon style={{margin:"10px"}}/>
                    <CallIcon style={{margin:"10px"}}/>
                </S.SidebarVoiceIcons>
            </S.SidebarVoice> */}
            <S.SidebarProfile>
                <Avatar src="https://avatars2.githubusercontent.com/u/247129567"/>
                <S.SidebarProfileInfo>
                    @ssssangha
                    <p>##thisIsMyId</p>
                </S.SidebarProfileInfo>
                <S.SidebarProfileIcon>
                    <MicIcon style={{margin:"5px"}}/>
                    <HeadsetIcon style={{margin:"5px"}}/>
                    <SettingsIcon style={{margin:"5px"}}/>
                </S.SidebarProfileIcon>
            </S.SidebarProfile>
        </S.Sidebar>
    )
}

export default Sidebar