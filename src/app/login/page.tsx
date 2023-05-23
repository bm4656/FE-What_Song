'use client';

import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { KAKAO_OAUTH2_URL } from '../constants/login';
import KaKaoIcon from '../../../public/login/kakao.svg';
import loginMain from '../../../public/lottie/loginMain.json';
import { SERVICE_URL } from '../constants/ServiceUrl';

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
			<div className="absolute w-full max-w-[90%] mx-auto inset-x-0 bottom-[2rem] flex items-center justify-center rounded-[0.8rem] h-[5rem] min-h-[5rem] bg-[#FAE64D]">
				<a href={KAKAO_OAUTH2_URL} className="flex font-bold text-[1.6rem] gap-[1.2rem]">
					<KaKaoIcon />
					<span>카카오 로그인/회원가입</span>
				</a>
			</div>
		</div>
	);
}
