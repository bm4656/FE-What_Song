import { YoutubeType } from '@/app/service/youtube';
import MusicBarCard from './card/MusicBarCard';

type Props = {
	list: YoutubeType[];
};
export default function MusicBarList({ list }: Props) {
	return (
		<ul className="flex flex-col gap-4">
			{list.map((item) => (
				<MusicBarCard music={item} key={item.videoId} />
			))}
		</ul>
	);
}
