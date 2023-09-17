import MusicBarCard from './card/MusicBarCard';
import { roomClients } from '@/app/service/room-client';
import { ResVideo, Video } from '@/types/video';

type Props = {
	list: ResVideo[] | Video[] | undefined;
	barType: string;
	roomId: string | number;
};

export default function MusicBars({ list, barType, roomId }: Props) {
	const handleAdd = (music: ResVideo, addType: string) => {
		if (addType === 'host') {
			// 방장: 뮤직 대기열 수락
			roomClients.acceptRequestMusic(music.reservationId);
			alert('뮤직이 플레이리스트에 추가되었습니다!');
		} else {
			// 뮤직 대기열 요청
			roomClients.registerMusic({ ...music, roomSeq: Number(roomId) });
			alert('뮤직 요청이 완료되었습니다!');
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
