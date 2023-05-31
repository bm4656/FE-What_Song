import Link from 'next/link';
import { BsPlusCircle } from 'react-icons/bs';

export default function PlusButton() {
	return (
		<div className="h-24 fixed bottom-32 w-full max-w-[50rem] flex justify-end">
			<Link
				href="/room/create"
				className="h-24 w-24 bg-primary rounded-full flex justify-center items-center mr-4 hover:scale-105"
			>
				<BsPlusCircle className="text-white w-12 h-12" />
			</Link>
		</div>
	);
}
