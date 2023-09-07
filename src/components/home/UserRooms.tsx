'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '@/app/service/room-client';
import MusicCarousel from '../music/MusicCarousel';
import useUser from '@/hooks/useUser';

export default function UserRooms() {
	const user = useUser();
	// 토큰 이슈로 임시 1번 처리
	const memberSeq = user.data?.memberSeq || '1';

	const { data, isLoading } = useQuery(
		['rooms', memberSeq],
		() => {
			return roomClients.getUserRooms(memberSeq);
		},
		{ staleTime: 1000 * 60 * 3 }
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<MusicCarousel rooms={data} isHost />
		</>
	);
}
