'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '@/app/service/room-client';
import MusicCarousel from '../music/MusicCarousel';
import useUser from '@/hooks/useUser';
import MusicCardNone from '../skeleton/MusicCardNone';
import RoomsLoader from '../skeleton/RoomsLoader';

export default function UserRooms() {
	const user = useUser();
	const memberSeq = user.data?.memberSeq;

	const { data, isLoading: loading } = useQuery(
		['rooms', memberSeq],
		() => {
			return roomClients.getUserRooms(memberSeq);
		},
		{
			staleTime: 1000 * 60 * 3,
			enabled: Boolean(memberSeq), // memberSeq가 있는 경우에만 쿼리를 실행하도록 설정
		}
	);

	if (loading) {
		return <RoomsLoader />;
	}
	return <>{data[0] ? <MusicCarousel rooms={data} /> : <MusicCardNone type="user" />}</>;
}
