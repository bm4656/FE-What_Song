'use client';

import { useRouter } from 'next/navigation';
import KaKaoIcon from '../../../public/login/kakao.svg';

interface Props {
	content: string;
	clickFn?: () => void;
	link?: string;
	bgColor?: string;
	disabled?: boolean;
}

export default function Button({ content, clickFn, link, bgColor = 'bg-[#428EFF]', disabled = false }: Props) {
	const router = useRouter();
	const kakaoBtn = content.includes('카카오');
	const onClick = () => {
		if (link) {
			router.push(link);
		}
		if (clickFn) {
			clickFn();
		}
	};
	return (
		<button
			disabled={disabled}
			onClick={() => onClick()}
			className={`disabled:bg-[#c1cbd9] font-bold text-[1.6rem] absolute w-full max-w-[90%] mx-auto inset-x-0 bottom-[2rem] flex items-center justify-center rounded-[0.8rem] h-[5rem] min-h-[5rem] ${bgColor} gap-[1.2rem]`}
		>
			{kakaoBtn && <KaKaoIcon />}
			<span className={`${kakaoBtn ? 'text-black' : 'text-white'}`}>{content}</span>
		</button>
	);
}
