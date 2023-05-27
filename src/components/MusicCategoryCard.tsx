import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/app/service/rooms';

type Props = {
	category: Category;
};

export default function MusicCategoryCard({ category: { categoryName, description } }: Props) {
	return (
		<article className="m-4 rounded-2xl relative overflow-hidden bg-white shadow-lg shadow-zinc-300 w-[20rem] h-[28rem] hover:scale-95">
			<Link href={`/music/${categoryName.toLowerCase()}`}>
				<Image src="/assets/sample.png" alt="pop" width={200} height={200} className="shadow-inner" />
				<p className="text-neutral-400 text-lg font-semibold absolute bottom-20 left-4">{description}</p>
				<h2 className="text-4xl font-bold absolute bottom-8 left-4">{categoryName}</h2>
			</Link>
		</article>
	);
}
