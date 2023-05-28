import { Room } from '@/app/service/rooms';
import MusicRoomCard2 from './MusicRoomCard2';

type Props = {
	rooms: Room[];
	category: string;
};
export default function MusicCardGrid({ rooms, category }: Props) {
	return (
		<ul className="grid grid-cols-2 gap-4 p-2 h-full">
			{rooms.map((room) => (
				<li key={room.title}>
					<MusicRoomCard2 musicRoom={room} category={category} />
				</li>
			))}
		</ul>
	);
}
