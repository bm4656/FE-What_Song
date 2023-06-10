import MusicCarousel from '@/components/music/MusicCarousel';
import { getAllRooms } from '../service/rooms';

export default async function HomePage() {
	const rooms = await getAllRooms();
	return (
		<>
			<h2 className="text-3xl font-bold mx-5">친구들의 방</h2>
			<MusicCarousel rooms={rooms} />
			<h2 className="text-3xl font-bold mx-5 mt-2">내가 생성한 방</h2>
			<MusicCarousel rooms={rooms} />
			<h2 className="text-3xl font-bold mx-5 mt-2">최근 방문 목록</h2>
			<MusicCarousel rooms={rooms} />
		</>
	);
}
