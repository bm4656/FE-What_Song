import TitleHeader from '@/components/TitleHeader';
import Navbar from '@/components/bar/Navbar';
import PlusButton from '@/components/button/PlusButton';
import Rooms from '@/components/home/Rooms';
import StoriesPreview from '@/components/home/StoriesPreview';
import UserRooms from '@/components/home/UserRooms';

export default function HomePage() {
	return (
		<section className="overflow-y-auto absolute w-full h-full pb-32">
			<TitleHeader title="What Song" notification />
			<StoriesPreview />
			<h2 className="text-3xl font-bold mx-5 pl-4 tracking-wider">둘러보기</h2>
			<Rooms />
			<h2 className="text-3xl font-bold mx-5 mt-2 pl-4">내가 생성한 방</h2>
			<UserRooms />
			<h2 className="text-3xl font-bold mx-5 mt-2 pl-4">최근 방문 목록</h2>
			<Rooms />
			<PlusButton />
			<Navbar tab="home" />
		</section>
	);
}
