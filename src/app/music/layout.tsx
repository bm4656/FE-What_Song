import Navbar from '@/components/Navbar';

export default function MusicLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="overflow-y-auto absolute w-full h-full pb-28">
			{children}
			<Navbar tab="music" />
		</section>
	);
}
