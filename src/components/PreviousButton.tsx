'use client';
import { useRouter } from 'next/navigation';
import { AiOutlineLeft } from 'react-icons/ai';

export default function PreviousButton() {
	const router = useRouter();
	return (
		<button
			onClick={() => {
				router.back();
			}}
		>
			<AiOutlineLeft className="absolute left-0 top-0 w-20 h-20 p-4" />;
		</button>
	);
}
