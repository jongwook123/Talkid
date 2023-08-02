import React from 'react';
import * as S from './style';
import Sidebar from 'components/chattings/sidebar';
import Chat1 from 'components/chattings/chat';
import Listbar from 'components/chattings/listbar';



function ChattingPage() {
  return (

    <S.Head1>
      <Listbar/>
      <Sidebar/>
      <Chat1/>
    </S.Head1>

    
  );
}

export default ChattingPage;
