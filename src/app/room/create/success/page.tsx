import Button from '@/components/button/Button';
import MusicRecord from '@/components/music/streaming/MusicRecord';
import PageHeaderContent from '@/components/PageHeaderContent';
import TitleHeader from '@/components/TitleHeader';

export default function CreateSuccessPage() {
	return (
		<>
			<TitleHeader title="뮤직방 생성" previous />
			<article className="flex flex-col h-5/6 justify-around items-start gap-5 p-[2rem]">
				<MusicRecord image="/assets/sample.png" />
				<PageHeaderContent
					content="음악 방 생성이 완료되었어요! 🤗
					<br /> 지금 바로 음악 같이 들으러 가볼까요?"
				/>
				<Button content="완료" link="/" />
			</article>
		</>
	);
}
