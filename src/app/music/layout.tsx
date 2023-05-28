import Navbar from '@/components/Navbar';
import PlusButton from '@/components/PlusButton';

export default function MusicLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="overflow-y-auto absolute w-full h-full pb-28">
			{children}
			<PlusButton />
			<Navbar tab="music" />
		</section>
	);
}
