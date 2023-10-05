'use client';

import { useQuery } from '@tanstack/react-query';
import ReactCarousel from './ReactCarousel';
import MusicCategoryCard from './card/MusicCategoryCard';
import MusicRoomCard from './card/MusicRoomCard';
import { Room } from '@/types/room';

type Category = {
	categoryName: string;
	description: string;
};
type Props = {
	rooms?: Room[];
	categories?: Category[];
};

export default function MusicCarousel({ rooms, categories }: Props) {
	return (
		<section className="flex pl-2 mb-4">
			<ReactCarousel>
				{rooms &&
					rooms?.map((room, index) => (
						<MusicRoomCard musicRoom={room} key={room.have.musicRoomSeq} priority={index < 3} />
					))}
				{categories &&
					categories.map((category: Category) => <MusicCategoryCard category={category} key={category.categoryName} />)}
			</ReactCarousel>
		</section>
	);
}
