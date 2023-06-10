'use client';

// import { useQuery } from '@tanstack/react-query';
import MusicCarousel from '@/components/music/MusicCarousel';
import TitleHeader from '@/components/TitleHeader';
import SearchBar from '@/components/bar/SearchBar';
import { roomApis } from '../service/room';

export default async function MusicPage() {
	const allRooms = await roomApis.getAllRooms();
	const categories = await roomApis.getCategories();
	return (
		<>
			<TitleHeader title="뮤직방" />
			<SearchBar name="뮤직방을 검색하세요..." />
			<h2 className="text-4xl font-bold mx-5">인기</h2>
			<MusicCarousel rooms={allRooms} />
			<h2 className="text-4xl font-bold mx-5">카테고리</h2>
			<MusicCarousel categories={categories} />
		</>
	);
}
