import { useAtom } from 'jotai';
import { BsFillXCircleFill } from 'react-icons/bs';
import { modalAtom } from '@/state/store/modal';

// 💡 하단에서 위로 올라오는 모달, 모달 내용에는 자식으로 구현하고자 하는 컴포넌트 전달하면 됨.

export default function BottomSheetModal({ children }: { children: React.ReactNode }) {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);

	return (
		<div className="fixed top-0 bottom-0 w-full max-w-[50rem] bg-black/50 z-30">
			<button
				className="w-full absolute bottom-[46rem] flex justify-center items-center"
				onClick={() => setModalOpen((prev) => !prev)}
			>
				<BsFillXCircleFill className="text-neutral-200 text-6xl w-12 h-12" />
			</button>
			<article className="absolute bottom-0 left-0 w-full max-w-screen-md h-[45rem] rounded-t-2xl px-4 pb-1 flex justify-center bg-neutral-100 animate-[bottom-sheet-up_200ms_ease-in-out]">
				<div className="absolute top-4 bg-neutral-400 w-28 h-[0.4rem] rounded-full" />
				{children}
			</article>
		</div>
	);
}
