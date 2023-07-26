import { dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/query/getQueryClient';
import HydrateOnClient from '@/utils/query/hydrateOnClient';
import { roomApis } from '../service/room';
import MusicCarousel from '@/components/music/MusicCarousel';

export default async function HydratedRooms() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['rooms'], roomApis.getAllRooms);
	const dehydratedState = dehydrate(queryClient);
	return (
		<HydrateOnClient state={dehydratedState}>
			<MusicCarousel />
		</HydrateOnClient>
	);
}
