// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
import MusicBarCard from './card/MusicBarCard';
import { roomClients } from '@/app/service/room-client';
import { MusicBar } from '@/types/modal';
import { ResVideo } from '@/types/video';
import { playlistStatusSend } from '@/utils/iframe/send';
import { ListType } from '@/types/room';

type Props = {
	list: ResVideo[] | undefined;
	barType: MusicBar;
	roomId: number;
	musicSock: any;
	roomCode: string;
	memberSeq: number;
	updateList?: (listType: ListType) => void;
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
				await Swal.fire({
					title: '대기열 뮤직 수락',
					text: '플레이리스트에 뮤직 요청이 들어왔어요!',
					icon: 'question',
					showDenyButton: true,
					confirmButtonColor: '#428EEF',
					confirmButtonText: '요청 수락',
					denyButtonText: '요청 거절',
				}).then((res) => {
					if (res.isConfirmed) {
						Swal.fire({
							title: '요청 수락 완료!',
							text: '요청 뮤직이 플레이리스트에 추가되었습니다.',
							icon: 'success',
						});
						roomClients.acceptRequestMusic(music.reservationId);
						playlistStatusSend(roomCode, roomId, musicSock);
					}
					if (res.isDenied) {
						Swal.fire({
							title: '요청 수락 거절!',
							text: '요청 거절이 완료되었습니다.',
							icon: 'error',
						});
						roomClients.rejectRequestMusic(music.reservationId, roomId);
						// eslint-disable-next-line no-unused-expressions
						// updateList && updateList('allList');
					}
				});
				// eslint-disable-next-line no-unused-expressions
				updateList && updateList('allList');
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
