import MusicRoomCard from './MusicRoomCard';
import { Room } from '@/app/service/rooms';
import ReactCarousel from './ReactCarousel';

type Props = {
	rooms: Room[];
};

export default function MusicCarousel({ rooms }: Props) {
	return (
		<section className="flex mx-2 ml-6 pl-2 mb-4">
			<ReactCarousel>
				{rooms.map((room: Room) => (
					<MusicRoomCard musicRoom={room} key={room.id} />
				))}
			</ReactCarousel>
		</section>
	);
}
