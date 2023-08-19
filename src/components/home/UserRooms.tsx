'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '@/app/service/room-client';
import MusicCarousel from '../music/MusicCarousel';
import useUser from '@/hooks/useUser';

export default function UserRooms() {
	const user = useUser();
	const memberSeq = user.data?.memberSeq;

	const { data, isLoading } = useQuery(
		['rooms', memberSeq],
		() => {
			return roomClients.getUserRooms(memberSeq);
		},
		{ staleTime: 1000 * 60 * 3 }
	);

	// useEffect(() => {
	// 	if (!user.isLoading) {
	// 		// 여기에서 필요한 추가 동작 수행 가능
	// 	}
	// }, [user.isLoading]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<MusicCarousel rooms={data} isHost />
		</>
	);
}
