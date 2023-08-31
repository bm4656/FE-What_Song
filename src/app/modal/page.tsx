'use client';

import { useAtom } from 'jotai';
import { modalAtom } from '@/state/store/modal';
import RequestModal from '@/components/RequestModal';

export default function ModalTestPage() {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	return (
		<>
			<p>모달테스트</p>
			<button className="bg-blue-300" onClick={() => setModalOpen((prev) => !prev)}>
				리퀘스트 요청하기
			</button>
			<RequestModal />
		</>
	);
}
