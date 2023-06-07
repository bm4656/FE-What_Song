'use client';

import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonBar from '@/components/bar/ButtonBar';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import nicknameInput from '../../../public/lottie/nicknameInput.json';
import InputBar from '../bar/InputBar';
import PageHeaderContent from '../PageHeaderContent';

export default function NicknameInputPage() {
	const router = useRouter();
	const [nickname, setNickname] = useState<string>('');

	const onNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	// const { mutate: registerMutate } = useMutation(loginApis.getRegister, {
	// 	onSuccess: (res) => {
	// 		console.log(res);
	// 	},
	// 	onError: (error) => console.log(error),
	// });

	// TODO 회원가입 요청 보내기 {kakaoInfo, nickname}
	const SignIn = () => {
		// getCookie('kakaoUserInfo')
		// removeCookie('kakaoUserInfo');
		// registerMutate({})
		router.push(`${SERVICE_URL.register}?page=2`);
	};

	return (
		<div className="bg-white h-[100vh] p-[2rem] relative">
			<PageHeaderContent content="닉네임을 입력해주세요! 🔥" mb="mb-[2.3rem]" />
			<InputBar placeholder="닉네임을 입력해주세요." value={nickname} onChange={onNickNameChange} />
			<Lottie className="mr-[1rem]" animationData={nicknameInput} />
			<ButtonBar clickFn={() => SignIn()} content="다음" disabled={nickname === ''} />
		</div>
	);
}
