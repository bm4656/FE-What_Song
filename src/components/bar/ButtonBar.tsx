import KaKaoIcon from '../../../public/login/kakao.svg';

interface Props {
	clickFn: () => void;
	content: string;
	bgColor?: string;
	disabled?: boolean;
}

export default function ButtonBar({ clickFn, content, bgColor = 'bg-[#428EFF]', disabled = false }: Props) {
	const kakaoBtn = content.includes('카카오');
	return (
		<button
			disabled={disabled}
			onClick={() => clickFn()}
			className={`disabled:bg-[#c1cbd9] font-bold text-[1.6rem] absolute w-full max-w-[90%] mx-auto inset-x-0 bottom-[2rem] flex items-center justify-center rounded-[0.8rem] h-[5rem] min-h-[5rem] ${bgColor} gap-[1.2rem]`}
		>
			{kakaoBtn && <KaKaoIcon />}
			<span className={`${kakaoBtn ? 'text-black' : 'text-white'}`}>{content}</span>
		</button>
	);
}
