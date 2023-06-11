import { useQuery } from '@tanstack/react-query';
// import { useAtomValue } from 'jotai';
import MusicCarousel from '@/components/music/MusicCarousel';
import { roomApis } from '../service/room';
// import { UserInfoAtom } from '@/state/store/login';

export default async function HomePage() {
	// const userInfo = useAtomValue(UserInfoAtom);
	const memberSeq = 1;
	// const { data: userRooms } = useQuery(['userRooms', memberSeq], () => roomApis.getUserRooms(memberSeq), {
	// 	staleTime: 1000 * 60,
	// });
	// const { data: allRooms } = useQuery(['allRooms'], () => roomApis.getAllRooms(), {
	// 	staleTime: 1000 * 60,
	// });
	return (
		<>
			<h2 className="text-3xl font-bold mx-5">친구들의 방</h2>
			{/* <MusicCarousel rooms={allRooms} /> */}
			<h2 className="text-3xl font-bold mx-5 mt-2">내가 생성한 방</h2>
			{/* <MusicCarousel rooms={userRooms} /> */}
			<h2 className="text-3xl font-bold mx-5 mt-2">최근 방문 목록</h2>
			{/* <MusicCarousel rooms={allRooms} /> */}
		</>
	);
}
