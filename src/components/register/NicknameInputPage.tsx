'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import Button from '@/components/button/Button';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import nicknameInput from '../../../public/lottie/nicknameInput.json';
import InputBar from '../bar/InputBar';
import PageHeaderContent from '../PageHeaderContent';
import LottieView from '../LottieView';
import { loginApis } from '@/app/service/login';
import { registerInfo } from '@/state/store/login';
import { setCookie } from '@/constants/cookie';

export default function NicknameInputPage() {
	const router = useRouter();
	const [nickname, setNickname] = useState<string>('');
	const [registerData] = useAtom(registerInfo);

	const onNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	const { mutate: registerMutate } = useMutation(loginApis.postRegister, {
		onSuccess: () => {
			router.push(`${SERVICE_URL.register}?page=2&nickname=${nickname}`);
		},
		onError: (error) => console.log(error),
	});

	const signUp = async () => {
		registerMutate({
			...registerData,
			innerNickName: nickname,
		});
	};

	return (
		<div className="wrap">
			<PageHeaderContent content="닉네임을 입력해주세요! 🔥" mb="mb-[2.3rem]" />
			<InputBar
				placeholder="닉네임을 입력해주세요."
				value={nickname}
				onChange={onNickNameChange}
				styles="bg-[#F8F8FA] mb-[15%]"
			/>
			<LottieView file={nicknameInput} styles="mr-[1rem]" />
			<Button clickFn={() => signUp()} content="다음" disabled={nickname === ''} />
		</div>
	);
}
