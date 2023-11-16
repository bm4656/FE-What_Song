// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
import MusicBarCard from './card/MusicBarCard';
import { roomClients } from '@/app/service/room-client';
import { MusicBar } from '@/types/modal';
import { ResVideo } from '@/types/video';
import { playlistStatusSend } from '@/utils/iframe/send';

type Props = {
	list: ResVideo[] | undefined;
	barType: MusicBar;
	roomId: string;
	musicSock: any;
	roomCode: string;
	memberSeq: number;
	updateList?: (listType: 'queueList' | 'playList') => void;
};

export default function MusicBars({ list, barType, roomId, musicSock, roomCode, memberSeq, updateList }: Props) {
	const handleAdd = async (music: ResVideo, addType: MusicBar) => {
		switch (addType) {
			case 'ADD':
				// 방장: 뮤직 추가
				await roomClients.registerMusic({ ...music, roomSeq: Number(roomId), memberSeq });
				playlistStatusSend(roomCode, roomId, musicSock);
				await Swal.fire({
					title: '뮤직 추가 완료!',
					text: '플레이리스트에 추가되었습니다!',
					icon: 'success',
					confirmButtonColor: '#428EEF',
				});
				// eslint-disable-next-line no-unused-expressions
				updateList && updateList('playList');
				break;
			case 'ACCEPT':
				// 방장: 뮤직 대기열 수락
				await roomClients.acceptRequestMusic(music.reservationId);
				playlistStatusSend(roomCode, roomId, musicSock);
				await Swal.fire({
					title: '대기열 뮤직 수락!',
					text: '플레이리스트에 추가되었습니다!',
					icon: 'success',
					confirmButtonColor: '#428EEF',
				});
				// eslint-disable-next-line no-unused-expressions
				updateList && updateList('playList');
				break;
			case 'REQUEST':
				// 일반: 뮤직 대기열 요청
				await roomClients.registerMusic({ ...music, roomSeq: Number(roomId) });
				await Swal.fire({
					title: '대기열 뮤직 요청!',
					text: '뮤직 요청이 완료되었습니다!',
					icon: 'success',
					confirmButtonColor: '#428EEF',
				});
				// eslint-disable-next-line no-unused-expressions
				updateList && updateList('queueList');
				break;

			default:
		}
	};

	return (
		<ul className="flex flex-col gap-4 max-h-[35rem] overflow-scroll">
			{list?.map((item) => (
				<MusicBarCard
					key={item.reservationId}
					music={{ ...item, roomSeq: Number(roomId) }}
					onAdd={handleAdd}
					barType={barType}
				/>
			))}
		</ul>
	);
}
