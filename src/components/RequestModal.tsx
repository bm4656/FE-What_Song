import { useAtom } from 'jotai';
import { modalAtom } from '@/state/store/modal';
import SearchBar from './bar/SearchBar';
import MusicBars from './music/MusicBars';

export default function RequestModal() {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	const data = [
		{
			videoId: '11cta61wi0g',
			title: 'NewJeans (뉴진스) &#39;Hype Boy&#39; Official MV (Performance ver.1)',
			channelName: 'HYBE LABELS',
			thumbnailUrl: 'https://i.ytimg.com/vi/11cta61wi0g/hqdefault.jpg',
		},
		{
			videoId: '11cta61wi0g',
			title: 'NewJeans (뉴진스) &#39;Hype Boy&#39; Official MV (Performance ver.1)',
			channelName: 'HYBE LABELS',
			thumbnailUrl: 'https://i.ytimg.com/vi/11cta61wi0g/hqdefault.jpg',
		},
	];
	const playList = data.filter((item) => {
		const str = /&#39;/gi;
		return (item.title = item.title.replace(str, "'"));
	});
	const id = 1;

	if (!modalOpen) return null;
	return (
		<div className="absolute w-full max-w-[50rem] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
			<section className="absolute bottom-0 bg-white w-full h-[60%] p-4 rounded-t-[40px] shadow-lg ">
				<div className="flex justify-center">
					<div className="bg-slate-200 w-10 h-1 mb-5" onClick={() => setModalOpen(false)} />
				</div>
				<SearchBar placeholder="추가하고 싶은 뮤직을 입력하세요..." />
				<p className="text-2xl font-bold p-2 ml-12">플레이리스트</p>
				<MusicBars list={playList} roomId={id} />
			</section>
		</div>
	);
}
