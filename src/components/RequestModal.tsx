import { useAtom } from 'jotai';
import { modalAtom } from '@/state/store/modal';
import SearchBar from './bar/SearchBar';
import MusicBars from './music/MusicBars';

export default function RequestModal() {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);

	if (!modalOpen) return null;
	return (
		<section className="bg-red-200 w-full h-[60%]">
			<div className="flex justify-between p-2">
				<h1>뮤직 요청하기</h1>
				<button onClick={() => setModalOpen(false)}>닫기</button>
			</div>
			<SearchBar placeholder="추가하고 싶은 뮤직을 입력하세요..." />
			<p className="text-2xl font-bold p-1">플레이리스트</p>
			{/* <MusicBars list={playList} isList roomId={id} /> */}
		</section>
	);
}
