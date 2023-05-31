'use client';

import { useRouter } from 'next/navigation';

type Props = {
	name: string;
	link?: string;
	onClick?: () => void;
};
export default function Button({ name, link, onClick }: Props) {
	const router = useRouter();
	const onButton = () => {
		if (link) {
			router.push(link);
		}
		if (onClick) {
			onClick();
		}
	};
	return (
		<div className="w-full absolute bottom-10 flex justify-center items-center">
			<button className="w-[88%] h-20 bg-primary rounded-[10px] text-white text-2xl font-bold" onClick={onButton}>
				{name}
			</button>
		</div>
	);
}
