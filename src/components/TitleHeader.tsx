import { IoNotifications } from 'react-icons/io5';
import PreviousButton from './PreviousButton';

type Props = {
	title: string;
	notification?: boolean;
	previous?: boolean;
};
export default function TitleHeader({ title, notification, previous }: Props) {
	return (
		<header className="flex w-full h-20 my-1 justify-center items-center">
			{previous && <PreviousButton />}
			<h1 className="text-3xl font-bold">{title}</h1>
			{notification && <IoNotifications className="text-3xl absolute right-5" />}
		</header>
	);
}
