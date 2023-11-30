import UserRooms from '@/components/home/UserRooms';
import StoriesPreview from '@/components/home/StoriesPreview';
import Rooms from '@/components/home/Rooms';

export default function HomePage() {
	return (
		<>
			<StoriesPreview />
			<h2 className="text-3xl font-bold mx-5 pl-4">친구들의 방</h2>
			<Rooms />
			<h2 className="text-3xl font-bold mx-5 mt-2 pl-4">내가 생성한 방</h2>
			<UserRooms />
			<h2 className="text-3xl font-bold mx-5 mt-2 pl-4">최근 방문 목록</h2>
			<Rooms />
		</>
	);
}
