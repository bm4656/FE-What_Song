'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '../../app/service/room-client';
import MusicCarousel from '@/components/music/MusicCarousel';
import MusicCardNone from '../skeleton/MusicCardNone';
import RoomsLoader from '../skeleton/RoomsLoader';

export default function Rooms() {
	const { data, isLoading, isError } = useQuery(['rooms'], () => {
		return roomClients.getTop10Rooms();
	});
	if (isLoading || isError) {
		return <RoomsLoader />;
	}

	return <>{data[0] ? <MusicCarousel rooms={data} /> : <MusicCardNone type="all" />}</>;
}
