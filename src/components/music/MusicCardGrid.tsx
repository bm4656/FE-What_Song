import { Room } from '@/types/room';
import MusicRoomCard2 from './card/MusicRoomCard2';

type Props = {
	rooms: Room[];
	size?: 'small' | 'normal';
};
export default function MusicCardGrid({ rooms, size = 'normal' }: Props) {
	return (
		<ul className="grid grid-cols-2 gap-4 p-2 place-content-center overflow-x-hidden h-full w-full max-[490px]:gap-0">
			{rooms.map((room) => (
				<MusicRoomCard2 musicRoom={room} key={room.have.roomName} />
			))}
		</ul>
	);
}
