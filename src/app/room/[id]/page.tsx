import { getRoomData } from '@/app/service/rooms';
import ChattingBar from '@/components/ChattingBar';
import MusicRecord from '@/components/MusicRecord';
import StreamingBar from '@/components/StreamingBar';
import TitleHeader from '@/components/TitleHeader';

type Props = {
	params: { id: number };
};

export default async function MusicRoomPage({ params: { id } }: Props) {
	const { title, view, thumnail, host, isOwner } = await getRoomData(id);
	return (
		<>
			<TitleHeader title={title} previous view={view} />
			<MusicRecord image={thumnail} isHost={isOwner} />
			<div className="flex flex-col justify-center items-center p-2 w-full">
				<h2 className="text-4xl font-bold">Spicy</h2>
				<p className="text-3xl font-semibold text-zinc-400">aespa</p>
			</div>
			<StreamingBar isHost={isOwner} />
			<ChattingBar />
		</>
	);
}
