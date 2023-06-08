'use client';

import Lottie from 'lottie-react';
import { KAKAO_OAUTH2_URL } from '../../constants/login';
import loginMain from '../../../public/lottie/loginMain.json';
import Button from '@/components/button/Button';
import PageHeaderContent from '@/components/PageHeaderContent';

export default function LoginPage() {
	return (
		<div className="wrap">
			<PageHeaderContent
				content="What Song과 함께
				<br /> 음악의 세계를 새롭게
				<br /> 발견하세요! 🔭"
				mb="mb-[20%]"
			/>
			<Lottie animationData={loginMain} />
			<Button link={KAKAO_OAUTH2_URL} content="카카오 로그인/회원가입" bgColor="bg-[#FAE64D]" />
		</div>
	);
}
