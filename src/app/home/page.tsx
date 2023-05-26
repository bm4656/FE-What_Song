import MusicCarousel from '@/components/MusicCarousel';
import Navbar from '@/components/Navbar';

export default function HomePage() {
	return (
		<main className="overflow-y-auto absolute w-full h-full pb-28">
			<header className="flex w-full h-20 justify-center items-center ">
				<h1 className="text-3xl font-bold ">What Song</h1>
			</header>
			<h2 className="text-2xl font-bold mx-5">친구들의 방</h2>
			<MusicCarousel />
			<h2 className="text-2xl font-bold mx-5">내가 생성한 방</h2>
			<MusicCarousel />
			<Navbar tab="home" />
		</main>
	);
}
