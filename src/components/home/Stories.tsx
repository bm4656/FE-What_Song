'use client';

import { useAtom } from 'jotai';
import { modalAtom } from '@/state/store/modal';

export default function Stories() {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);

	if (!modalOpen) return null;

	return (
		<div className="absolute inset-0 z-50 bg-black w-full h-screen">
			<div className="text-white">스토리 뷰</div>
			<button onClick={() => setModalOpen(false)} className="text-white">
				닫기
			</button>
		</div>
	);
}
