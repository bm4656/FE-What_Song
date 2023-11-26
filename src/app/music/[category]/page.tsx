'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '@/app/service/room-client';
import TitleHeader from '@/components/TitleHeader';
import MusicCardGrid from '@/components/music/MusicCardGrid';

type Props = {
	params: {
		category: string;
	};
};

export default async function CategoryPage({ params: { category } }: Props) {
	const { data: rooms } = useQuery(
		['rooms'],
		() => {
			return roomClients.getAllRooms();
		},
		{ staleTime: 1000 * 3 }
	);
	return (
		<section className="pb-10">
			<TitleHeader title={`${category.toUpperCase()} 리스트`} previous />
			<MusicCardGrid rooms={rooms} />
		</section>
	);
}
