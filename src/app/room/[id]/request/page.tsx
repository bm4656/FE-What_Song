import TitleHeader from '@/components/TitleHeader';
import SearchBar from '@/components/bar/SearchBar';
import MusicBarList from '@/components/music/MusicBarLIst';

export default function RequestPage() {
	return (
		<section className="wrap">
			<TitleHeader title="뮤직리스트" previous isWrap />
			<SearchBar placeholder="추가하고 싶은 뮤직을 입력하세요..." />
			{/* <MusicBarList /> */}
		</section>
	);
}
