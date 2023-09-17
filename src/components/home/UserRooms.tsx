'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '@/app/service/room-client';
import MusicCarousel from '../music/MusicCarousel';
import useUser from '@/hooks/useUser';
import MusicCardNone from '../skeleton/MusicCardNone';

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

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return <>{data[0] ? <MusicCarousel rooms={data} /> : <MusicCardNone type="user" />}</>;
}
