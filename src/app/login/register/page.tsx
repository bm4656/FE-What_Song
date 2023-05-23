'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { SERVICE_URL } from '@/app/constants/ServiceUrl';
import registerComplete from '../../../../public/lottie/registerComplete.json';
import nicknameInput from '../../../../public/lottie/nicknameInput.json';

export default function RegisterPage() {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const router = useRouter();
	const [nickName, setNickName] = useState<string>('');

	const onNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickName(event.target.value);
	};
	return (
		<>
			{page === '1' && (
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
					<button
						disabled={nickName === ''}
						onClick={() => router.push(`${SERVICE_URL.register}?page=2`)}
						className="disabled:bg-[#c1cbd9] text-[1.6rem] font-bold text-white absolute w-full max-w-[90%] mx-auto inset-x-0 bottom-[2rem] flex items-center justify-center rounded-[0.8rem] h-[5rem] min-h-[5rem] bg-[#428EFF]"
					>
						다음
					</button>
				</div>
			)}
			{page === '2' && (
				<div className="bg-white h-[100vh] p-[2rem] relative">
					<h1 className="text-[2.2rem] font-bold mb-[20%]">
						000님 What Song과 <br /> 음악 세계 탐험에 함께하게 되었어요! 🎤
					</h1>
					<Lottie animationData={registerComplete} />
					<button
						onClick={() => router.push(`${SERVICE_URL.register}?page=2`)}
						className="text-[1.6rem] font-bold text-white absolute w-full max-w-[90%] mx-auto inset-x-0 bottom-[2rem] flex items-center justify-center rounded-[0.8rem] h-[5rem] min-h-[5rem] bg-[#428EFF]"
					>
						함께하기
					</button>
				</div>
			)}
		</>
	);
}
