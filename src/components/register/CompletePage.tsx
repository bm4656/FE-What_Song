'use client';

import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import ButtonBar from '@/components/bar/ButtonBar';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import registerComplete from '../../../public/lottie/registerComplete.json';
import PageHeaderContent from '../PageHeaderContent';

export default function CompletePage() {
	const router = useRouter();
	return (
		<div className="bg-white h-[100vh] p-[2rem] relative">
			<PageHeaderContent content="000님 What Song과 <br /> 음악 세계 탐험에 함께하게 되었어요! 🎤" mb="mb-[20%]" />
			<Lottie animationData={registerComplete} />
			<ButtonBar clickFn={() => router.replace(`${SERVICE_URL.home}`)} content="함께하기" />
		</div>
	);
}
