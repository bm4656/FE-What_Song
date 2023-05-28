import { Room } from '@/app/service/rooms';
import MusicRoomCard2 from './MusicRoomCard2';

type Props = {
	rooms: Room[];
	category: string;
};
export default function MusicCardGrid({ rooms, category }: Props) {
	return (
		<ul className="grid grid-cols-2 gap-4 p-2 place-content-center overflow-x-hidden h-full w-full max-[500px]:gap-0">
			{rooms.map((room) => (
				<MusicRoomCard2 musicRoom={room} category={category} key={room.title} />
			))}
		</ul>
	);
}
