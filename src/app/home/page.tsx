import Carousel from '@/components/Carousel';
import Navbar from '@/components/Navbar';

export default function HomePage() {
	return (
		<main>
			<header className="flex w-full h-20 justify-center items-center ">
				<h1 className="text-3xl font-bold ">What Song</h1>
			</header>
			<h2 className="text-2xl font-bold mx-5">친구들의 방</h2>
			<Carousel />
			<Navbar tab="home" />
		</main>
	);
}
