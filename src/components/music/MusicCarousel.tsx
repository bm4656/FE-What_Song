import { Room } from '@/app/service/room';
import { Category } from '@/app/service/rooms';
import ReactCarousel from './ReactCarousel';
import MusicCategoryCard from './card/MusicCategoryCard';
import MusicRoomCard from './card/MusicRoomCard';

type Props = {
	rooms?: Room[];
	categories?: Category[];
};

export default function MusicCarousel({ rooms, categories }: Props) {
	return (
		<section className="flex pl-2 mb-4">
			<ReactCarousel>
				{rooms && rooms?.map((room: Room) => <MusicRoomCard musicRoom={room} key={room.musicRoomSeq} />)}
				{categories &&
					categories.map((category: Category) => <MusicCategoryCard category={category} key={category.categoryName} />)}
			</ReactCarousel>
		</section>
	);
}
