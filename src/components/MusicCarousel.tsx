'use client';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import MusicRoomCard from './MusicRoomCard';
import { Room } from '@/app/service/rooms';

type Props = {
	rooms: Room[];
};

export default function MusicCarousel({ rooms }: Props) {
	return (
		<section className="flex mt-2 ml-6 pl-2">
			<ScrollingCarousel className="flex">
				{rooms.map((room: Room) => (
					<MusicRoomCard musicRoom={room} key={room.id} />
				))}
			</ScrollingCarousel>
		</section>
	);
}
