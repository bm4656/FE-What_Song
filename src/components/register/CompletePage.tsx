'use client';

import Button from '@/components/button/Button';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import registerComplete from '../../../public/lottie/registerComplete.json';
import PageHeaderContent from '../PageHeaderContent';
import LottieView from '../LottieView';

export default function CompletePage() {
	return (
		<div className="wrap">
			<PageHeaderContent content="000님 What Song과 <br /> 음악 세계 탐험에 함께하게 되었어요! 🎤" mb="mb-[20%]" />
			<LottieView file={registerComplete} />
			<Button link={SERVICE_URL.home} content="함께하기" />
		</div>
	);
}
