import axios from 'axios';
import MusicCarousel from '@/components/music/MusicCarousel';
import TitleHeader from '@/components/TitleHeader';
import SearchBar from '@/components/bar/SearchBar';
import { roomApis } from '../service/room';
import categories from '../../../public/data/category.json';

export default async function MusicPage() {
	const rooms = await roomApis.getAllRooms();

	return (
		<>
			<TitleHeader title="뮤직방" />
			<SearchBar placeholder="뮤직방을 검색하세요..." />
			<h2 className="text-4xl font-bold mx-5">인기</h2>
			<MusicCarousel rooms={rooms} />
			<h2 className="text-4xl font-bold mx-5">카테고리</h2>
			<MusicCarousel categories={categories} />
		</>
	);
}
