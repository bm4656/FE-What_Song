'use client';

import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonBar from '@/components/bar/ButtonBar';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import nicknameInput from '../../../public/lottie/nicknameInput.json';

export default function NicknameInputPage() {
	const router = useRouter();
	const [nickName, setNickName] = useState<string>('');

	const onNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickName(event.target.value);
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
		// registerMutate({})
		router.push(`${SERVICE_URL.register}?page=2`);
	};

	return (
		<div className="bg-white h-[100vh] p-[2rem] relative">
			<h1 className="text-[2.2rem] font-bold mb-[2.3rem]">닉네임을 입력해주세요! 🔥</h1>
			<input
				type="text"
				placeholder="닉네임을 입력해주세요."
				value={nickName}
				onChange={onNickNameChange}
				className="w-full rounded-[0.8rem] h-[4.5rem] p-[1.5rem] mb-[15%] text-[1.4rem] bg-[#F8F8FA]"
			/>
			<Lottie className="mr-[1rem]" animationData={nicknameInput} />
			{/* TODO 닉네임 대입 API 호출 후 page2 이동 */}
			<ButtonBar clickFn={() => SignIn()} content="다음" disabled={nickName === ''} />
		</div>
	);
}
