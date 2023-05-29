import TitleHeader from '@/components/TitleHeader';

export default function RoomCreateLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="overflow-y-auto absolute w-full h-full">
			<TitleHeader title="뮤직방 생성" previous />
			{children}
		</section>
	);
}
