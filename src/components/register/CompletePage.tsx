'use client';

import { useAtomValue } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import registerComplete from '../../../public/lottie/registerComplete.json';
import PageHeaderContent from '../PageHeaderContent';
import LottieView from '../LottieView';
import { UserInfoAtom } from '@/state/store/login';
import { loginApis } from '@/app/service/login';

export default function CompletePage() {
	const router = useRouter();
	const userInfo = useAtomValue(UserInfoAtom);

	const { mutate: logoutMutate } = useMutation(loginApis.Logout, {
		onSuccess: (res) => {
			if (res.status === 200) {
				router.push(SERVICE_URL.login);
			}
		},
		onError: (error) => {
			// error.response.status 440 이면 로그아웃 상태
		},
	});

	return (
		<div className="wrap">
			<PageHeaderContent
				content={`${userInfo?.nickname}님 What Song과 <br /> 음악 세계 탐험에 함께하게 되었어요! 🎤`}
				mb="mb-[20%]"
			/>
			<LottieView file={registerComplete} />
			<Button link={SERVICE_URL.home} content="함께하기" />
			{/* <Button clickFn={() => logoutMutate()} content="로그아웃 테스트" /> */}
		</div>
	);
}
