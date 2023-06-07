'use client';

import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { KAKAO_OAUTH2_URL } from '../../constants/login';
import loginMain from '../../../public/lottie/loginMain.json';
import ButtonBar from '@/components/bar/ButtonBar';

export default function LoginPage() {
	const router = useRouter();
	return (
		<div className="bg-white h-[100vh] p-[2rem] relative">
			<h1 className="text-[2.2rem] font-bold mb-[20%]">
				What Song과 함께
				<br /> 음악의 세계를 새롭게
				<br /> 발견하세요! 🔭
			</h1>
			<Lottie animationData={loginMain} />
			<ButtonBar
				clickFn={() => router.push(KAKAO_OAUTH2_URL)}
				content="카카오 로그인/회원가입"
				bgColor="bg-[#FAE64D]"
			/>
		</div>
	);
}
