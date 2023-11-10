import MusicBarCard from './card/MusicBarCard';
import { roomClients } from '@/app/service/room-client';
import { MusicBar } from '@/types/modal';
import { ResVideo, Video } from '@/types/video';
import { playlistStatusSend } from '@/utils/iframe/send';

type Props = {
	list: ResVideo[] | undefined;
	barType: MusicBar;
	roomId: string;
	musicSock: any;
	roomCode: string;
	memberSeq: number;
};

export default function MusicBars({ list, barType, roomId, musicSock, roomCode, memberSeq }: Props) {
	const handleAdd = (music: ResVideo, addType: MusicBar) => {
		switch (addType) {
			case 'ADD':
				// 방장: 뮤직 추가
				roomClients.registerMusic({ ...music, roomSeq: Number(roomId), memberSeq });
				playlistStatusSend(roomCode, roomId, musicSock);
				alert('뮤직이 플레이리스트에 추가되었습니다!');
				break;
			case 'ACCEPT':
				// 방장: 뮤직 대기열 수락
				roomClients.acceptRequestMusic(music.reservationId);
				playlistStatusSend(roomCode, roomId, musicSock);
				alert('대기열 뮤직이 플레이리스트에 추가되었습니다!');
				break;
			case 'REQUEST':
				// 일반: 뮤직 대기열 요청
				roomClients.registerMusic({ ...music, roomSeq: Number(roomId) });
				alert('뮤직 요청이 완료되었습니다!');
				break;

			default:
		}
	};
	return (
		<ul className="flex flex-col gap-4 max-h-[35rem] overflow-scroll">
			{list?.map((item) => (
				<MusicBarCard
					key={item.videoId}
					music={{ ...item, roomSeq: Number(roomId) }}
					onAdd={handleAdd}
					barType={barType}
				/>
			))}
		</ul>
	);
}
