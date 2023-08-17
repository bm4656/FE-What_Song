import HydratedRooms from '../../components/home/HydratedRooms';

export default function HomePage() {
	// user 정보 GET
	return (
		<>
			<h2 className="text-3xl font-bold mx-5">친구들의 방</h2>
			{/* @ts-expect-error Server Component */}
			<HydratedRooms type="all" />
			<h2 className="text-3xl font-bold mx-5 mt-2">내가 생성한 방</h2>
			{/* @ts-expect-error Server Component */}
			<HydratedRooms type="have" />
			<h2 className="text-3xl font-bold mx-5 mt-2">최근 방문 목록</h2>
			{/* @ts-expect-error Server Component */}
			<HydratedRooms type="all" />
		</>
	);
}
