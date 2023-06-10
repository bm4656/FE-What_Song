import { Room } from '@/app/service/room';
import MusicRoomCard2 from './card/MusicRoomCard2';

type Props = {
	rooms: Room[];
};
export default function MusicCardGrid({ rooms }: Props) {
	return (
		<ul className="grid grid-cols-2 gap-4 p-2 place-content-center overflow-x-hidden h-full w-full max-[490px]:gap-0">
			{rooms.map((room) => (
				<MusicRoomCard2 musicRoom={room} key={room.roomName} />
			))}
		</ul>
	);
}
