import { useAtom } from 'jotai';
import { modalAtom } from '@/state/store/modal';

export default function Modal({ onFn }: { onFn: () => void }) {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);

	if (!modalOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 ">
			<div className="bg-white p-8 w-[24.5rem] h-[10rem] rounded-xl text-2xl font-semibold">
				⚒️ 뮤직룸을 삭제하시겠습니까? 🛠️
				<div className="flex m-6 pt-3 justify-between">
					<button onClick={() => onFn()}>네</button>
					<button onClick={() => setModalOpen(false)}>아니오</button>
				</div>
			</div>
		</div>
	);
}
