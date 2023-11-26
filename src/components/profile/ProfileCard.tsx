'use client';

import { FiSettings } from 'react-icons/fi';
import { useAtom } from 'jotai';
import ProfileBar from './ProfileBar';
import ProfileButton from './ProfileButton';
import useUser from '@/hooks/useUser';
import BottomSheetModal from '../modal/BottomSheetModal';
import SearchFriend from './SearchFriend';
import { modalAtom } from '@/state/store/modal';

export default function ProfileCard() {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	const user = useUser().data;

	if (!user) return null;
	return (
		<section className="w-full h-[25rem]">
			<ProfileBar user={user} />
			<div className="flex gap-4 justify-center items-center mt-16">
				<ProfileButton addStyle="w-[40%] text-2xl">프로필 편집</ProfileButton>
				<ProfileButton clickFn={() => setModalOpen((prev) => !prev)} addStyle="w-[40%] text-2xl">
					친구 찾기
				</ProfileButton>
				<ProfileButton addStyle="w-[10%] text-3xl  flex items-center justify-center">
					<FiSettings />
				</ProfileButton>
			</div>
			{modalOpen && (
				<BottomSheetModal>
					<SearchFriend ownerSeq={user.memberSeq} />
				</BottomSheetModal>
			)}
		</section>
	);
}