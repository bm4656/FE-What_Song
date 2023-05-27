import MusicCarousel from '@/components/MusicCarousel';
import Navbar from '@/components/Navbar';
import TitleHeader from '@/components/TitleHeader';
import { getAllCategories, getAllRooms } from '../service/rooms';
import SearchBar from '@/components/SearchBar';

export default async function MusicPage() {
	const rooms = await getAllRooms();
	const categories = await getAllCategories();
	return (
		<section className="overflow-y-auto absolute w-full h-full pb-28">
			<TitleHeader title="뮤직방" />
			<SearchBar name="뮤직방을 검색하세요..." />
			<h2 className="text-4xl font-bold mx-5">인기</h2>
			<MusicCarousel rooms={rooms} />
			<h2 className="text-4xl font-bold mx-5">카테고리</h2>
			<MusicCarousel categories={categories} />
			<Navbar tab="music" />
		</section>
	);
}
