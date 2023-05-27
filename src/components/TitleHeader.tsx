import { IoNotifications } from 'react-icons/io5';

type Props = {
	title: string;
	notification?: boolean;
};
export default function TitleHeader({ title, notification }: Props) {
	return (
		<header className="flex w-full h-20 my-1 justify-center items-center ">
			<h1 className="text-3xl font-bold ">{title}</h1>
			{notification && <IoNotifications className="text-3xl absolute right-5" />}
		</header>
	);
}
