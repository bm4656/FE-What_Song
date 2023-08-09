import UserRooms from '@/components/hydrate/UserRooms';
import HydratedRooms from '../../components/hydrate/HydratedRooms';

export default function HomePage() {
	// userInfo api 완성 후 수정 예정
	const memberSeq = '1';
	return (
		<>
			<h2 className="text-3xl font-bold mx-5">친구들의 방</h2>
			{/* @ts-expect-error Server Component */}
			<HydratedRooms type="all" />
			<h2 className="text-3xl font-bold mx-5 mt-2">내가 생성한 방</h2>
			{/* @ts-expect-error Server Component */}
			<HydratedRooms type="have" memberSeq={memberSeq} />
			<h2 className="text-3xl font-bold mx-5 mt-2">최근 방문 목록</h2>
			{/* @ts-expect-error Server Component */}
			<HydratedRooms type="all" />
		</>
	);
}
