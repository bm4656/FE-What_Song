'use client';

import { useQuery } from '@tanstack/react-query';
import MusicCardGrid from '../music/MusicCardGrid';
import useUser from '@/hooks/useUser';
import { roomClients } from '@/app/service/room-client';
import RoomsRoader from '../skeleton/RoomsLoader';

export default function PostGrid() {
	const user = useUser();
	const memberSeq = user.data?.id;

	const { data, isLoading: loading } = useQuery(
		['rooms', memberSeq],
		() => {
			return roomClients.getUserRooms(memberSeq);
		},
		{
			staleTime: 1000 * 60 * 3,
			enabled: !!memberSeq, // memberSeq가 있는 경우에만 쿼리를 실행하도록 설정
		}
	);

	if (loading) {
		return <RoomsRoader />;
	}

	return (
		<section className="pb-10">
			<MusicCardGrid rooms={data} />
		</section>
	);
}
