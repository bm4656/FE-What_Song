import { roomApis } from '@/app/service/room';
import TitleHeader from '@/components/TitleHeader';
import MusicCardGrid from '@/components/music/MusicCardGrid';

type Props = {
	params: {
		category: string;
	};
};

export default async function CategoryPage({ params: { category } }: Props) {
	const rooms = await roomApis.getAllRooms();
	return (
		<section className="pb-10">
			<TitleHeader title={`${category.toUpperCase()} 리스트`} previous />
			<MusicCardGrid rooms={rooms} />
		</section>
	);
}
