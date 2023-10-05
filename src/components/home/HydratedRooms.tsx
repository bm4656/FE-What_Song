import { dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/query/getQueryClient';
import HydrateOnClient from '@/utils/query/hydrateOnClient';
import { roomApis } from '../../app/service/room';
import Rooms from './Rooms';
import UserRooms from './UserRooms';

type Props = {
	type?: string;
};

export default async function HydratedRooms({ type }: Props) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['rooms'], roomApis.getAllRooms);
	const dehydratedState = dehydrate(queryClient);
	return <HydrateOnClient state={dehydratedState}>{type === 'all' && <Rooms />}</HydrateOnClient>;
}
