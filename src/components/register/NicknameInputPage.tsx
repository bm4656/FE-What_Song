'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/button/Button';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import nicknameInput from '../../../public/lottie/nicknameInput.json';
import InputBar from '../bar/InputBar';
import PageHeaderContent from '../PageHeaderContent';
import LottieView from '../LottieView';
import { UserInfoAtom, registerInfo } from '@/state/store/login';
import { loginApis } from '@/app/service/login';

export default function NicknameInputPage() {
	const router = useRouter();
	const [nickname, setNickname] = useState<string>('');
	const [registerInfoData, setReisterInfoData] = useAtom(registerInfo);
	const setUserInfo = useSetAtom(UserInfoAtom);

	const onNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	const { mutate: registerMutate } = useMutation(loginApis.postRegister, {
		onSuccess: (res) => {
			setUserInfo(res.data);
			setReisterInfoData({
				id: '',
				kakao_account: {
					email: '',
				},
			});
			router.push(`${SERVICE_URL.register}?page=2`);
		},
		onError: (error) => console.log(error),
	});

	const signUp = async () => {
		registerMutate({ email: registerInfoData.kakao_account.email, nickname, oauthId: registerInfoData.id });
	};

	return (
		<div className="wrap">
			<PageHeaderContent content="닉네임을 입력해주세요! 🔥" mb="mb-[2.3rem]" />
			<InputBar placeholder="닉네임을 입력해주세요." value={nickname} onChange={onNickNameChange} />
			<LottieView file={nicknameInput} styles="mr-[1rem]" />
			<Button clickFn={() => signUp()} content="다음" disabled={nickname === ''} />
		</div>
	);
}
