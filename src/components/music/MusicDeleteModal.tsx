'use client';

import { useAtom } from 'jotai';
import { CgDetailsMore } from 'react-icons/cg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { modalAtom } from '@/state/store/modal';
import { roomClients } from '@/app/service/room-client';

export default function MusicDeleteModal({ musicRoomSeq }: { musicRoomSeq: number }) {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	const queryClient = useQueryClient();
	const { mutate: deleteMusicRoomMutate } = useMutation(roomClients.deleteRoom, {
		onSuccess: () => {
			queryClient.invalidateQueries(['rooms']);
		},
		onError: (error) => console.log(error),
	});

	const deleteAlert = () => {
		Swal.fire({
			title: '뮤직룸 삭제',
			text: '이 뮤직룸을 삭제하시겠습니까?',
			showCancelButton: true,
			confirmButtonText: '네',
			cancelButtonText: `아니오`,
			confirmButtonColor: '#428EEF',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('삭제 완료!', '', 'success');
				deleteMusicRoomMutate(musicRoomSeq);
				setModalOpen((prev) => !prev);
			}
		});
	};
	return (
		<>
			<button className="absolute top-4 right-9" onClick={deleteAlert}>
				<CgDetailsMore className="w-10 h-10 text-zinc-100" />
			</button>
		</>
	);
}
