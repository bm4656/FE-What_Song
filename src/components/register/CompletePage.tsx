'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import Button from '@/components/button/Button';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import registerComplete from '../../../public/lottie/registerComplete.json';
import PageHeaderContent from '../PageHeaderContent';
import LottieView from '../LottieView';
import { loginApis } from '@/app/service/login';
import { registerInfo } from '@/state/store/login';
import { setCookie } from '@/constants/cookie';

interface Props {
	nickname: string;
}

export default function CompletePage({ nickname }: Props) {
	const [registerData] = useAtom(registerInfo);

	const setCookies = () => {
		setCookie('accessToken', registerData.accessToken, {
			path: '/',
		});
		setCookie('refreshToken', registerData.refreshToken, {
			path: '/',
		});
	};
	return (
		<div className="wrap">
			<PageHeaderContent
				content={`${nickname}님 What Song과 <br /> 음악 세계 탐험에 함께하게 되었어요! 🎤`}
				mb="mb-[20%]"
			/>
			<LottieView file={registerComplete} />
			<Button clickFn={setCookies} link={SERVICE_URL.home} content="함께하기" />
		</div>
	);
}
