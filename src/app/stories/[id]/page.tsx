import StoriesView from '@/components/home/StoriesView';
import '../../styles/storiesProgressbar.css';

type Props = {
	params: { id: string };
};

export default async function StoriesPage({ params: { id } }: Props) {
	return <StoriesView selectIndex={Number(id)} />;
}
