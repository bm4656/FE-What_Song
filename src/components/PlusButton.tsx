import Link from 'next/link';
import { BsPlusCircle } from 'react-icons/bs';

export default function PlusButton() {
	return (
		<Link
			href="/music/room/create"
			className="w-24 h-24 bg-primary rounded-full fixed bottom-32 left-[57rem] flex justify-center items-center"
		>
			<BsPlusCircle className="text-white w-12 h-12" />
		</Link>
	);
}
