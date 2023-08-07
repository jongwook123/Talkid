import * as S from './style';

import Sidebar from 'components/chattings/sidebar';
import Chat1 from 'components/chattings/chat';
import Listbar from 'components/chattings/listbar';

function ChattingPages() {
	return (
		<S.Main>
			<Listbar />
			<Sidebar />
			<Chat1 />
		</S.Main>
	);
}

export default ChattingPages;
