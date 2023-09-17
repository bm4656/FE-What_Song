'use client';

import { useAtom } from 'jotai';
import { CgDetailsMore } from 'react-icons/cg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modalAtom } from '@/state/store/modal';
import Modal from '../Modal';
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
	const onDeleteRoom = async () => {
		deleteMusicRoomMutate(musicRoomSeq);
		setModalOpen((prev) => !prev);
	};
	return (
		<>
			<button className="absolute top-4 right-9" onClick={() => setModalOpen((prev) => !prev)}>
				<CgDetailsMore className="w-10 h-10 text-zinc-100" />
			</button>
			<Modal onFn={onDeleteRoom} />
		</>
	);
}
