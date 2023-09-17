'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import SearchBar from './bar/SearchBar';
import MusicBars from './music/MusicBars';
import { ResVideo } from '@/types/video';
import { BottomModalAtom } from '@/state/store/bottomModal';
import { roomClients } from '@/app/service/room-client';

export default function RequestModal({ modalType }: { modalType: string }) {
	const params = useParams();
	const roomId = params.id;
	const [modalOpen, setModalOpen] = useAtom(BottomModalAtom);
	const [searchList, setSearchList] = useState<ResVideo[]>([]);
	// 현재 플레이리스트
	const { data: playList } = useQuery(['playList', roomId], () => {
		return roomClients.getPlayList(Number(roomId));
	});
	// 현재 대기열리스트
	const { data: queueList } = useQuery(['queueList', roomId], () => {
		return roomClients.getQueueList(Number(roomId));
	});
	// console.log(queueList);
	const searchFn = (list: ResVideo[]) => {
		// console.log('동작', list[0]);
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
					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
					<div className="bg-slate-200 w-10 h-1 mb-5 cursor-pointer" onClick={() => setModalOpen(false)} />
				</div>
				<SearchBar placeholder="추가하고 싶은 뮤직을 입력하세요..." searchFn={searchFn} removeFn={removeFn} />
				<p className="text-2xl font-bold p-2 ml-12">플레이리스트</p>
				{searchList[0] ? (
					<MusicBars list={searchList} roomId={roomId} barType={modalType} />
				) : (
					<MusicBars list={playList} roomId={roomId} barType={modalType} />
				)}
			</section>
			{modalType === 'host' && (
				<section className="absolute bottom-0 bg-white w-full h-[60%] p-4 rounded-t-[40px] shadow-lg ">
					<div className="flex justify-center">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
						<div className="bg-slate-200 w-10 h-1 mb-5 cursor-pointer" onClick={() => setModalOpen(false)} />
					</div>
					<p className="text-2xl font-bold p-2 ml-12">플레이리스트 대기열</p>
					<MusicBars list={queueList} roomId={roomId} barType={modalType} />
				</section>
			)}
			{modalType === 'modify' && (
				<section className="absolute bottom-0 bg-white w-full h-[60%] p-4 rounded-t-[40px] shadow-lg ">
					<div className="flex justify-center">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
						<div className="bg-slate-200 w-10 h-1 mb-5 cursor-pointer" onClick={() => setModalOpen(false)} />
					</div>
					<p className="text-2xl font-bold p-2 ml-12">플레이리스트 수정</p>
					<MusicBars list={playList} roomId={roomId} barType={modalType} />
				</section>
			)}
		</div>
	);
}
