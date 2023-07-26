'use client';

import { useQuery } from '@tanstack/react-query';
import { Room } from '@/app/service/room';
import ReactCarousel from './ReactCarousel';
import MusicCategoryCard from './card/MusicCategoryCard';
import MusicRoomCard from './card/MusicRoomCard';
import { roomClients } from '@/app/service/room-client';

type Category = {
	categoryName: string;
	description: string;
};
type Props = {
	rooms?: Room[];
	categories?: Category[];
};

export default function MusicCarousel({ rooms, categories }: Props) {
	const { data, isFetching } = useQuery(['rooms'], () => {
		return roomClients.getAllRooms();
	});
	return (
		<section className="flex pl-2 mb-4">
			<ReactCarousel>
				{data && data?.map((room: Room) => <MusicRoomCard musicRoom={room} key={room.have.musicRoomSeq} />)}
				{categories &&
					categories.map((category: Category) => <MusicCategoryCard category={category} key={category.categoryName} />)}
			</ReactCarousel>
		</section>
	);
}
