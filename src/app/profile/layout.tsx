import Navbar from '@/components/bar/Navbar';
import PlusButton from '@/components/button/PlusButton';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="overflow-y-auto absolute w-full h-full pb-28">
			{children}
			<PlusButton />
			<Navbar tab="profile" />
		</section>
	);
}
