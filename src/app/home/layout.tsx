import TitleHeader from '@/components/TitleHeader';
import Navbar from '@/components/bar/Navbar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="overflow-y-auto absolute w-full h-full pb-32">
			<TitleHeader title="What Song" notification />
			{children}
			<Navbar tab="home" />
		</section>
	);
}
