'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '../../app/service/room-client';
import MusicCarousel from '@/components/music/MusicCarousel';
import MusicCardNone from '../skeleton/MusicCardNone';

export default function Rooms() {
	const { data, isLoading } = useQuery(
		['rooms'],
		() => {
			return roomClients.getAllRooms();
		},
		{ staleTime: 1000 * 60 * 3 }
	);
	if (isLoading) {
		return <p>Loading...</p>;
	}
	return <>{data[0] ? <MusicCarousel rooms={data} /> : <MusicCardNone type="all" />}</>;
}
