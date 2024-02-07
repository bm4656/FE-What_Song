'use client';

import { FiSettings } from 'react-icons/fi';
import { useAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import ProfileBar from './ProfileBar';
import ProfileButton from './ProfileButton';
import BottomSheetModal from '../modal/BottomSheetModal';
import SearchFriend from './SearchFriend';
import { modalAtom } from '@/state/store/modal';
import { UserMe } from '@/types/user';
import { loginApis } from '@/app/service/login';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import { removeCookie } from '@/constants/cookie';

export default function ProfileCard({ user }: { user: UserMe }) {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	const { mutate: logoutMutate } = useMutation(['oauth2', 'logout'], () => loginApis.logout(), {
		onSuccess: (res) => {
			console.log(res);
			// 로그아웃 성공
			removeCookie('accessToken');
			removeCookie('refreshToken');
			window.location.href = SERVICE_URL.login;
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const getLogout = async () => {
		logoutMutate();
	};
	return (
		<section className="w-full h-[25rem]">
			<ProfileBar user={user} />
			<div className="flex gap-4 justify-center items-center mt-16">
				<ProfileButton addStyle="w-[40%] text-2xl">프로필 편집</ProfileButton>
				<ProfileButton clickFn={() => setModalOpen((prev) => !prev)} addStyle="w-[40%] text-2xl">
					친구 찾기
				</ProfileButton>
				<ProfileButton clickFn={() => getLogout()} addStyle="w-[10%] text-3xl  flex items-center justify-center">
					<FiSettings />
				</ProfileButton>
			</div>
			{modalOpen && (
				<BottomSheetModal>
					<SearchFriend ownerSeq={user.id} />
				</BottomSheetModal>
			)}
		</section>
	);
}
