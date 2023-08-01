'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '../../app/service/room-client';
import MusicCarousel from '@/components/music/MusicCarousel';

export default function Rooms() {
	const { data } = useQuery(
		['rooms'],
		() => {
			return roomClients.getAllRooms();
		},
		{ staleTime: 1000 * 60 * 3 }
	);
	return (
		<>
			<MusicCarousel rooms={data} />
		</>
	);
}
