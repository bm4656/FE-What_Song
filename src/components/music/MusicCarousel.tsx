'use client';

import { useQuery } from '@tanstack/react-query';
import { Room } from '@/app/service/room';
import ReactCarousel from './ReactCarousel';
import MusicCategoryCard from './card/MusicCategoryCard';
import MusicRoomCard from './card/MusicRoomCard';

type Category = {
	categoryName: string;
	description: string;
};
type Props = {
	rooms?: Room[];
	categories?: Category[];
	isHost?: boolean;
};

export default function MusicCarousel({ rooms, categories, isHost }: Props) {
	return (
		<section className="flex pl-2 mb-4">
			<ReactCarousel>
				{rooms &&
					rooms?.map((room: Room) => (
						<MusicRoomCard musicRoom={room} key={room.have.musicRoomSeq} isHostCard={isHost} />
					))}
				{categories &&
					categories.map((category: Category) => <MusicCategoryCard category={category} key={category.categoryName} />)}
			</ReactCarousel>
		</section>
	);
}
