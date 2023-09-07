'use client';

import { roomClients } from '@/app/service/room-client';
import RequestModal from '@/components/RequestModal';
import TitleHeader from '@/components/TitleHeader';
import SearchBar from '@/components/bar/SearchBar';
import MusicBars from '@/components/music/MusicBars';

type Props = {
	params: { id: string };
};

export default async function RequestPage({ params: { id } }: Props) {
	const playList = await roomClients.getQueueList(Number(id));
	return (
		<section className="wrap">
			<TitleHeader title="뮤직리스트" previous isWrap />
			{/* <SearchBar placeholder="추가하고 싶은 뮤직을 입력하세요..." /> */}
			<RequestModal />
			<h2 className="text-2xl font-bold p-1">플레이리스트</h2>
			<MusicBars list={playList} isList roomId={id} />
		</section>
	);
}
