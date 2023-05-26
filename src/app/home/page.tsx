import MusicCarousel from '@/components/MusicCarousel';
import Navbar from '@/components/Navbar';
import { getAllRooms } from '../service/rooms';

export default async function HomePage() {
	const rooms = await getAllRooms();
	return (
		<main className="overflow-y-auto absolute w-full h-full pb-28">
			<header className="flex w-full h-20 justify-center items-center ">
				<h1 className="text-3xl font-bold ">What Song</h1>
			</header>
			<h2 className="text-3xl font-bold mx-5">친구들의 방</h2>
			<MusicCarousel rooms={rooms} />
			<h2 className="text-3xl font-bold mx-5 mt-2">내가 생성한 방</h2>
			<MusicCarousel rooms={rooms} />
			<h2 className="text-3xl font-bold mx-5 mt-2">최근 방문 목록</h2>
			<MusicCarousel rooms={rooms} />
			<Navbar tab="home" />
		</main>
	);
}
