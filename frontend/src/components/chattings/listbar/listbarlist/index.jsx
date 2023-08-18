import React from "react";
import * as S from './style';
import ListList from "./listlist";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function ListbarList() {
    return(
        <S.ListbarList>
            <S.AddList>
                <AddCircleOutlineIcon fontSize="large"/>
            </S.AddList>
            <ListList/>
            <ListList/>
            <ListList/>


        </S.ListbarList>
    )
}

export default ListbarList;