'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import SearchBar from './bar/SearchBar';
import MusicBars from './music/MusicBars';
import { Video } from '@/types/video';
import { BottomModalAtom } from '@/state/store/bottomModal';
import { useQuery } from '@tanstack/react-query';
import { roomClients } from '@/app/service/room-client';

export default function RequestModal() {
	const params = useParams();
	const roomId = params.id;
	const [modalOpen, setModalOpen] = useAtom(BottomModalAtom);
	const [searchList, setSearchList] = useState<Video[]>([]);
	// const data = [
	// 	{
	// 		videoId: '11cta61wi0g',
	// 		title: 'NewJeans (뉴진스) &#39;Hype Boy&#39; Official MV (Performance ver.1)',
	// 		channelName: 'HYBE LABELS',
	// 		thumbnailUrl: 'https://i.ytimg.com/vi/11cta61wi0g/hqdefault.jpg',
	// 	},
	// 	{
	// 		videoId: '11cta61wi0g1',
	// 		title: 'NewJeans (뉴진스) &#39;Hype Boy&#39; Official MV (Performance ver.1)',
	// 		channelName: 'HYBE LABELS',
	// 		thumbnailUrl: 'https://i.ytimg.com/vi/11cta61wi0g/hqdefault.jpg',
	// 	},
	// ];
	// const playList = data.filter((item) => {
	// 	const str = /&#39;/gi;
	// 	return (item.title = item.title.replace(str, "'"));
	// });
	//현재 큐리스트로 플레이리스트 임시 처리
	const { data: playList } = useQuery(['playList', roomId], () => {
		return roomClients.getQueueList(Number(roomId));
	});
	const searchFn = (list: Video[]) => {
		console.log('동작', list[0]);
		setSearchList(list);
	};
	const removeFn = () => {
		setSearchList([]);
	};
	if (!modalOpen) return null;
	return (
		<div className="absolute w-full max-w-[50rem] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
			<section className="absolute bottom-0 bg-white w-full h-[60%] p-4 rounded-t-[40px] shadow-lg ">
				<div className="flex justify-center">
					<div className="bg-slate-200 w-10 h-1 mb-5 cursor-pointer" onClick={() => setModalOpen(false)} />
				</div>
				<SearchBar placeholder="추가하고 싶은 뮤직을 입력하세요..." searchFn={searchFn} removeFn={removeFn} />
				<p className="text-2xl font-bold p-2 ml-12">플레이리스트</p>
				{searchList[0] ? (
					<MusicBars list={searchList} roomId={roomId} />
				) : (
					<MusicBars list={playList} roomId={roomId} />
				)}
			</section>
		</div>
	);
}
