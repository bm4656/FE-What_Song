import Link from 'next/link';
import notFound from '../../public/lottie/notFound.json';
import LottieView from '@/components/LottieView';

export default function NotFound() {
	return (
		<div>
			<LottieView file={notFound} styles="absolute w-full h-full" />
			{/* <p>
				<Link href="/" className="text-2xl">
					돌아가기
				</Link>
			</p> */}
		</div>
	);
}
