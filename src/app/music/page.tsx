import MusicCarousel from '@/components/music/MusicCarousel';
import TitleHeader from '@/components/TitleHeader';
import categories from '../../../public/data/category.json';
import Rooms from '@/components/home/Rooms';

export default async function MusicPage() {
	return (
		<>
			<TitleHeader title="뮤직방" />
			<h2 className="text-4xl font-bold mx-5">인기</h2>
			<Rooms />
			<h2 className="text-4xl font-bold mx-5">카테고리</h2>
			<MusicCarousel categories={categories} />
		</>
	);
}
