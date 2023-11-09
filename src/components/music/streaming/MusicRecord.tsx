import Image from 'next/image';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { YouTubePlayer } from 'react-youtube';

type Props = {
	image: string;
	isHost?: boolean;
	music?: {
		videoId: string;
		title: string;
		channelName: string;
		thumbnailUrl: string;
	};
	playStatus?: string;
	player?: YouTubePlayer;
};

export default function MusicRecord({ image, isHost, music, playStatus, player }: Props) {
	return (
		<article className="relative w-full h-[38rem] flex justify-center items-center">
			{isHost && (
				<span className="bg-white w-16 h-16 rounded-full flex items-center justify-center z-20 scale-105">
					{playStatus === 'PLAYING' ? (
						<BsPauseFill onClick={() => player.pauseVideo()} className="cursor-pointer w-14 h-14 p-0.5 ml" />
					) : (
						<BsPlayFill onClick={() => player.playVideo()} className="cursor-pointer last:w-14 h-14 p-0.5 ml-1" />
					)}
				</span>
			)}
			<div
				className={`absolute right-44 max-[490px]:right-24 w-[20rem] h-[20rem] rounded-full z-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
					playStatus === 'PLAYING' && 'animate-spin'
				}`}
			>
				{/* <Image src="/assets/recordImg.png" alt="레코드" fill /> */}
			</div>

			<div className="w-80 h-96 absolute rounded-[40px] shadow-2xl shadow-slate-700 overflow-hidden z-10">
				<Image src={image} alt="이미지" fill />
			</div>
		</article>
	);
}
