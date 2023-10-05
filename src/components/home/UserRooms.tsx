'use client';

import { useQuery } from '@tanstack/react-query';
import { PropagateLoader } from 'react-spinners';
import { roomClients } from '@/app/service/room-client';
import MusicCarousel from '../music/MusicCarousel';
import useUser from '@/hooks/useUser';
import MusicCardNone from '../skeleton/MusicCardNone';

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
			enabled: !!memberSeq, // memberSeq가 있는 경우에만 쿼리를 실행하도록 설정
		}
	);

	if (loading) {
		return (
			<div className="flex justify-center items-center w-full h-[30rem] pl-2 mb-4 m-4">
				<PropagateLoader color="red" />;
			</div>
		);
	}
	return <>{data[0] ? <MusicCarousel rooms={data} /> : <MusicCardNone type="user" />}</>;
}
