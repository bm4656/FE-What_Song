import { getAllRooms } from '@/app/service/rooms';
import TitleHeader from '@/components/TitleHeader';
import MusicCardGrid from '@/components/music/MusicCardGrid';

type Props = {
	params: {
		slug: string;
	};
};
export default async function CategoryPage({ params: { slug } }: Props) {
	const rooms = await getAllRooms();
	return (
		<section className="pb-10">
			<TitleHeader title={`${slug.toUpperCase()} 리스트`} previous />
			<MusicCardGrid rooms={rooms} />
		</section>
	);
}
