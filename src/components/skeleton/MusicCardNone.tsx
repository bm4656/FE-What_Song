import Link from 'next/link';
import LottieView from '../LottieView';
import musicPeople from '../../../public/lottie/musicPeople.json';

export default function MusicCardNone({ type }: { type: string }) {
	return (
		<article className="m-4 overflow-hidden relative h-[30rem] opacity-80 flex justify-center">
			<Link href="room/create">
				<LottieView file={musicPeople} />
			</Link>
			<p className="text-[1.6rem] text-fontGray font-semibold font-mono absolute bottom-12">
				아직 뮤직룸이 없어요... 만들러 가볼까요?
			</p>
		</article>
	);
}
