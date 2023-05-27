import TitleHeader from '@/components/TitleHeader';

type Props = {
	params: {
		slug: string;
	};
};
export default function CategoryPage({ params: { slug } }: Props) {
	return (
		<section>
			<TitleHeader title={`${slug.toUpperCase()} 리스트`} previous />
		</section>
	);
}
