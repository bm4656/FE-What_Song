'use client';

import { useState } from 'react';
import { CompatClient } from '@stomp/stompjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBar from '@/components/bar/SearchBar';
import BottomSheetModal from '@/components/modal/BottomSheetModal';
import { ResVideo } from '@/types/video';
import MusicBars from '../MusicBars';
import { roomClients } from '@/app/service/room-client';
import { BottomModal } from '@/types/modal';
import { SimpleUser } from '@/types/user';
import ListenerBars from './ListenerBars';
import { ListType } from '@/types/room';

type Props = {
	modalType: BottomModal;
	musicSock: CompatClient;
	roomCode: string;
	memberList: SimpleUser[];
	memberSeq: number;
	roomId: number;
};
export default function StreamingModal({ modalType, musicSock, roomCode, memberList, memberSeq, roomId }: Props) {
	const queryClient = useQueryClient();
	const [searchList, setSearchList] = useState<ResVideo[]>([]);

	// 현재 플레이리스트 GET -> 변경 팔요
	const { data: playList } = useQuery(['playList', roomId], () => {
		return roomClients.getPlayList(Number(roomId));
	});
	// 대기열 리스트 GET
	const { data: queueList } = useQuery(['queueList', roomId], () => {
		return roomClients.getQueueList(Number(roomId));
	});
	// SearchBar에서 일어나는 이벤트 -> 검색, 검색리스트 지우기
	const searchFn = (list: ResVideo[]) => {
		setSearchList(list);
	};
	const removeFn = () => {
		setSearchList([]);
	};
	// MusicBars에서 일어나는 데이터 업데이트 쿼리에 알려줌
	const updateQuery = async (listType: ListType) => {
		// 🔥 invalidate 되지 않는 오류 확인
		if (listType === 'allList') {
			await queryClient.invalidateQueries({ queryKey: ['queueList', roomId] });
			await queryClient.invalidateQueries({ queryKey: ['playList', roomId] });
		} else {
			await queryClient.invalidateQueries({ queryKey: [listType, roomId] });
		}
		// console.log(playList);
	};

	return (
		<>
			<BottomSheetModal>
				{/* 방장 - 뮤직 추가 모달 */}
				{modalType === 'ADD' && (
					<>
						<SearchBar placeholder="검색" searchFn={searchFn} removeFn={removeFn} />
						<div className="absolute w-full top-32">
							{searchList[0] ? (
								<>
									<span className="text-xl font-bold ml-12 mb-5 text-neutral-400">검색 결과</span>
									<MusicBars
										list={searchList}
										roomId={roomId}
										barType={modalType}
										musicSock={musicSock}
										roomCode={roomCode}
										memberSeq={memberSeq}
										updateList={updateQuery}
									/>
								</>
							) : (
								<>
									<span className="text-xl font-bold ml-12 mb-5 text-neutral-400">플레이리스트 내역</span>
									<MusicBars
										list={playList}
										roomId={roomId}
										barType="NONE"
										musicSock={musicSock}
										roomCode={roomCode}
										memberSeq={memberSeq}
									/>
								</>
							)}
						</div>
					</>
				)}
				{/* 방장 - 뮤직 대기열 수락 모달 */}
				{modalType === 'ACCEPT' && (
					<>
						<div className="absolute w-full top-12">
							{queueList && queueList[0] ? (
								<>
									{/* <span className="text-xl font-bold p-2 ml-12 mb-5">📌 현재 대기열리스트</span> */}
									<MusicBars
										list={queueList}
										roomId={roomId}
										barType={modalType}
										musicSock={musicSock}
										roomCode={roomCode}
										memberSeq={memberSeq}
									/>
								</>
							) : (
								<div className="w-full h-full flex justify-center items-center">
									<span className="text-2xl font-semibold mb-5">현재 대기열이 없어요!💦</span>
								</div>
							)}
						</div>
					</>
				)}
				{/* 방장,일반 - 뮤직룸 참여자 조회 모달 */}
				{modalType === 'USERS' && (
					<>
						<div className="absolute w-full top-12">
							<span className="text-xl font-bold ml-12 mb-5 text-neutral-400">📌 참여자 목록</span>
							<ListenerBars memberList={memberList} memberSeq={memberSeq} />
						</div>
					</>
				)}
				{/* 일반 - 뮤직룸 플레이리스트 요청 모달 */}
				{modalType === 'REQUEST' && (
					<>
						<SearchBar placeholder="검색" searchFn={searchFn} removeFn={removeFn} />
						<div className="absolute w-full top-32">
							{searchList[0] ? (
								<>
									<span className="text-xl font-bold ml-12 mb-5 text-neutral-400">검색 결과</span>
									<MusicBars
										list={searchList}
										roomId={roomId}
										barType={modalType}
										musicSock={musicSock}
										roomCode={roomCode}
										memberSeq={memberSeq}
									/>
								</>
							) : (
								<>
									<span className="text-xl font-bold ml-12 mb-5 text-neutral-400">플레이리스트 내역</span>
									<MusicBars
										list={playList}
										roomId={roomId}
										barType="NONE"
										musicSock={musicSock}
										roomCode={roomCode}
										memberSeq={memberSeq}
									/>
								</>
							)}
						</div>
					</>
				)}
			</BottomSheetModal>
		</>
	);
}
