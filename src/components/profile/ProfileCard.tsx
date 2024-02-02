'use client';

import { FiSettings } from 'react-icons/fi';
import { useAtom } from 'jotai';
import ProfileBar from './ProfileBar';
import ProfileButton from './ProfileButton';
import BottomSheetModal from '../modal/BottomSheetModal';
import SearchFriend from './SearchFriend';
import { modalAtom } from '@/state/store/modal';
import { RawUser } from '@/types/user';

export default function ProfileCard({ user }: { user: RawUser }) {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);

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
