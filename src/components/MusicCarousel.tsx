import MusicRoomCard from './MusicRoomCard';
import { Category, Room } from '@/app/service/rooms';
import ReactCarousel from './ReactCarousel';
import MusicCategoryCard from './MusicCategoryCard';

type Props = {
	rooms?: Room[];
	categories?: Category[];
};

export default function MusicCarousel({ rooms, categories }: Props) {
	return (
		<section className="flex pl-2 mb-4">
			<ReactCarousel>
				{rooms && rooms?.map((room: Room) => <MusicRoomCard musicRoom={room} key={room.id} />)}
				{categories &&
					categories.map((category: Category) => <MusicCategoryCard category={category} key={category.categoryName} />)}
			</ReactCarousel>
		</section>
	);
}
