'use client';

import { BottomModal } from '@/types/modal';

type Props = {
	name: string;
	icon: JSX.Element;
	type: BottomModal;
	onIcon: (type: BottomModal) => void;
};
export default function StreamingButton({ name, icon, type, onIcon }: Props) {
	if (type === 'REQUEST')
		return (
			<button
				className="bg-primary w-44 h-20 text-white rounded-full flex gap-3 justify-center items-center cursor-pointer"
				onClick={() => {
					onIcon(type);
				}}
			>
				<div className="text-4xl">{icon}</div>
				<span className="text-2xl font-semibold">{name}</span>
			</button>
		);
	return (
		<button
			className="flex flex-col justify-center items-center cursor-pointer"
			onClick={() => {
				onIcon(type);
			}}
		>
			<div className="text-5xl">{icon}</div>
			<span className="text-xl text-zinc-400 w-full flex justify-center items-center">{name}</span>
		</button>
	);
}
