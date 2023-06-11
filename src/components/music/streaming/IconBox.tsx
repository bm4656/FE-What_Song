'use client';

import { useRouter } from 'next/navigation';

type Props = {
	name: string;
	children: React.ReactNode;
	// clickFn: () => void;
	clickFn: string;
};
export default function IconBox({ name, children, clickFn }: Props) {
	const router = useRouter();

	return (
		<button className="flex flex-col justify-center items-center cursor-pointer" onClick={() => router.push(clickFn)}>
			<div className="text-5xl">{children}</div>
			<span className="text-xl text-zinc-400 w-full flex justify-center items-center">{name}</span>
		</button>
	);
}
