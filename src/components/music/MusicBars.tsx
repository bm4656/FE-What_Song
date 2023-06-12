import { YoutubeType } from '@/app/service/youtube';
import MusicBarCard from './card/MusicBarCard';
import { roomClients } from '@/app/service/room-client';

type List = {
	videoId: string;
	title: string;
	channelName: string;
	thumbnailUrl: string;
};
type Props = {
	list: List[];
	isList: boolean;
	roomId: string | number;
};

export default function MusicBars({ list, isList, roomId }: Props) {
	const handleAdd = (music: YoutubeType) => {
		roomClients.resisterMusic({ ...music, roomSeq: Number(roomId) });
		alert('뮤직이 플레이리스트에 추가되었습니다!');
	};

	return (
		<ul className="flex flex-col gap-4">
			{list.map((item) => (
				<MusicBarCard
					key={item.videoId}
					music={{ ...item, roomSeq: Number(roomId) }}
					onAdd={handleAdd}
					isList={isList}
				/>
			))}
		</ul>
	);
}
