import { FaTrashAlt } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';

export default function RequestButton({ isRequest }: { isRequest: boolean }) {
	const handleRequest = () => {};
	return (
		<button className="absolute right-14 text-3xl hover:scale-110" onClick={handleRequest}>
			{isRequest ? <FaTrashAlt className="text-secondary" /> : <BsMusicNoteList className="text-secondary" />}
		</button>
	);
}
