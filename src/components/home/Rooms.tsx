'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '../../app/service/room-client';
import MusicCarousel from '@/components/music/MusicCarousel';
import MusicCardNone from '../skeleton/MusicCardNone';
import RoomsLoader from '../skeleton/RoomsLoader';

export default function Rooms() {
	const { data, isLoading } = useQuery(
		['rooms'],
		() => {
			return roomClients.getTop10Rooms();
		},
		{ staleTime: 1000 * 60 * 3 }
	);
	if (isLoading) {
		return <RoomsLoader />;
	}
	return <>{data[0] ? <MusicCarousel rooms={data} /> : <MusicCardNone type="all" />}</>;
}
