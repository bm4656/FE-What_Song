'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '@/app/service/room-client';
import MusicCarousel from '../music/MusicCarousel';

export default function UserRooms({ memberSeq }: { memberSeq: string }) {
	const { data } = useQuery(
		['rooms', memberSeq],
		() => {
			return roomClients.getUserRooms(memberSeq);
		},
		{ staleTime: 1000 * 60 * 3 }
	);
	return (
		<>
			<MusicCarousel rooms={data} />
		</>
	);
}
