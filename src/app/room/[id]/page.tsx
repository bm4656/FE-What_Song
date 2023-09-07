'use client';

import { useQuery } from '@tanstack/react-query';
import { roomClients } from '@/app/service/room-client';
import ChattingBar from '@/components/bar/ChattingBar';
import StreamingBar from '@/components/bar/StreamingBar';
import MusicRecord from '@/components/music/streaming/MusicRecord';
import MusicRecord2 from '@/components/music/streaming/MusicRecord2';
import TitleHeader from '@/components/TitleHeader';

type Props = {
	params: { id: string };
};

// if (isLoading) {
// 	return <p>Loading...</p>;
// }

export default async function MusicRoomPage({ params: { id } }: Props) {
	const {
		have: { musicRoomSeq, roomName, category, accessAuth },
	} = await roomClients.getRoomData(Number(id));
	const playList = await roomClients.getQueueList(Number(id));
	const view = 30;
	const isOwner = false;
	return (
		<>
			<TitleHeader title={roomName} previous view={view} />
			{playList[0] ? (
				<MusicRecord2 music={playList[0]} isHost={isOwner} id={Number(id)} />
			) : (
				<>
					<MusicRecord image="/assets/sample.png" isHost={isOwner} />
					<div className="flex flex-col justify-center items-center p-2 w-full">
						<h2 className="text-4xl font-bold">Title</h2>
						<p className="text-3xl font-semibold text-zinc-400">name</p>
					</div>
				</>
			)}
			<StreamingBar isHost={isOwner} roomId={musicRoomSeq} />
			<ChattingBar />
		</>
	);
}
