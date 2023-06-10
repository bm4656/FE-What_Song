'use client';

import { useAtomValue } from 'jotai';
import Button from '@/components/button/Button';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import registerComplete from '../../../public/lottie/registerComplete.json';
import PageHeaderContent from '../PageHeaderContent';
import LottieView from '../LottieView';
import { UserInfoAtom } from '@/state/store/login';

export default function CompletePage() {
	const userInfo = useAtomValue(UserInfoAtom);

	// TODO 로그아웃 로직 짜기
	// const logOut = () => {};

	return (
		<div className="wrap">
			<PageHeaderContent
				content={`${userInfo?.nickname}님 What Song과 <br /> 음악 세계 탐험에 함께하게 되었어요! 🎤`}
				mb="mb-[20%]"
			/>
			<LottieView file={registerComplete} />
			<Button link={SERVICE_URL.home} content="함께하기" />
			{/* <Button clickFn={() => logOut()} content="로그아웃 테스트" /> */}
		</div>
	);
}
