import { AiOutlineSearch } from 'react-icons/ai';

type Props = {
	name: string;
};
export default function SearchBar({ name }: Props) {
	return (
		<article className="flex justify-center items-center mb-5">
			<div className="bg-input w-[47.5rem] h-16  rounded-xl flex justify-start gap-5 items-center">
				<AiOutlineSearch className="text-3xl ml-5" />
				<p className="text-2xl">{name}</p>
			</div>
		</article>
	);
}
