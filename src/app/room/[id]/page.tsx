import { roomApis } from '@/app/service/room';
import ChattingBar from '@/components/bar/ChattingBar';
import StreamingBar from '@/components/bar/StreamingBar';
import MusicRecord from '@/components/music/streaming/MusicRecord';
import MusicRecord2 from '@/components/music/streaming/MusicRecord2';
import TitleHeader from '@/components/TitleHeader';
import useUser from '@/hooks/useUser';
import { Room } from '@/types/room';

type Props = {
	params: { id: string };
};

export default async function MusicRoomPage({ params: { id } }: Props) {
	// 뮤직룸 상세 정보
	const {
		have: { musicRoomSeq, roomName, category, accessAuth },
		extraInfo: { email, view },
	} = await roomApis.getRoomData(Number(id));
	// 유저 정보
	// const user = useUser();
	// const userEmail = user.data?.email;
	// 방장 유무 비교
	// const isOwner = userEmail === email;
	const isOwner = true;
	// const isOwner = false;

	// 현재 플레이리스트
	const playList = await roomApis.getPlayList(Number(id));
	// console.log(playList);
	return (
		<>
			<TitleHeader title={roomName} previous view={view} />
			{playList[0] ? (
				<MusicRecord2 music={playList[0]} isHost={isOwner} id={Number(id)} />
			) : (
				<>
					<MusicRecord image="/assets/sample.png" isHost={isOwner} />
					<div className="flex flex-col justify-center items-center p-2 w-full">
						<h2 className="text-4xl font-bold">음악을 추가해주세요.</h2>
						<p className="text-3xl font-semibold text-zinc-400">🎧</p>
					</div>
				</>
			)}
			<StreamingBar isHost={isOwner} roomId={musicRoomSeq} />
			<ChattingBar />
		</>
	);
}
