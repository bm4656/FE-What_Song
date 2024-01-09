import MusicRoomCardSkeleton from './MusicRoomCardSkeleton';

const skeleton = [1, 2, 3];
export default function RoomsRoader() {
	return (
		<ul className="flex pl-2 mb-4 overflow-hidden">
			{skeleton.map((i) => (
				<li key={i}>
					<MusicRoomCardSkeleton />
				</li>
			))}
		</ul>
	);
}
