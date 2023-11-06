import UserRooms from '@/components/home/UserRooms';
import HydratedRooms from '../../components/home/HydratedRooms';
import StoriesPreview from '@/components/home/StoriesPreview';

export default function HomePage() {
	return (
		<>
			<StoriesPreview />
			<h2 className="text-3xl font-bold mx-5">친구들의 방</h2>
			{/* @ts-expect-error Server Component */}
			<HydratedRooms type="all" />
			<h2 className="text-3xl font-bold mx-5 mt-2">내가 생성한 방</h2>
			{/* 내가 생성한 방은 CSR */}
			<UserRooms />
			<h2 className="text-3xl font-bold mx-5 mt-2">최근 방문 목록</h2>
			{/* @ts-expect-error Server Component */}
			<HydratedRooms type="all" />
		</>
	);
}
