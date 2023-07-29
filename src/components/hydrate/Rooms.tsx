'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '../../app/service/room-client';
import MusicCarousel from '@/components/music/MusicCarousel';

export default function Rooms() {
	const { data, isFetching } = useQuery(
		['rooms'],
		() => {
			// return roomClients.getAllRooms();
		},
		{ staleTime: 1000 * 3 }
	);
	return (
		<>
			<MusicCarousel rooms={data} />
		</>
	);
}
