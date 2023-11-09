'use client';

import { useState } from 'react';
import { CompatClient } from '@stomp/stompjs';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/bar/SearchBar';
import BottomSheetModal from '@/components/modal/BottomSheetModal';
import { ResVideo } from '@/types/video';
import MusicBars from '../MusicBars';
import { roomClients } from '@/app/service/room-client';
import { BottomModal } from '@/types/modal';

type Props = {
	modalType: BottomModal;
	musicSock: CompatClient;
	roomCode: string;
	memberList: [];
};
export default function StreamingModal({ modalType, musicSock, roomCode, memberList }: Props) {
	const params = useParams();
	const roomId = params.id;

	const [searchList, setSearchList] = useState<ResVideo[]>([]);

	const { data: playList } = useQuery(['playList', roomId], () => {
		return roomClients.getPlayList(Number(roomId));
	});

	const searchFn = (list: ResVideo[]) => {
		setSearchList(list);
	};
	const removeFn = () => {
		setSearchList([]);
	};

	return (
		<>
			<BottomSheetModal>
				{/* 방장 - 뮤직 추가 모달 */}
				<SearchBar placeholder="추가하고 싶은 뮤직을 입력하세요..." searchFn={searchFn} removeFn={removeFn} />
				<div className="absolute w-full top-32">
					{searchList[0] ? (
						<>
							<span className="text-xl font-bold p-2 ml-12 mb-5">🎼 검색 결과</span>
							<MusicBars
								list={searchList}
								roomId={roomId}
								barType={modalType}
								musicSock={musicSock}
								roomCode={roomCode}
							/>
						</>
					) : (
						<>
							<span className="text-xl font-bold p-2 ml-12 mb-5">🎼 현재 플레이리스트</span>
							<MusicBars
								list={playList}
								roomId={roomId}
								barType={modalType}
								musicSock={musicSock}
								roomCode={roomCode}
							/>
						</>
					)}
				</div>
				{/* 방장 - 뮤직 대기열 수락 모달 */}
			</BottomSheetModal>
		</>
	);
}
