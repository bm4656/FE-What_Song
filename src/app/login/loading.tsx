import LottieView from '@/components/LottieView';
import loading from '../../../public/lottie/loading.json';

export default function LoginLoadingPage() {
	return (
		<div className="wrap">
			<LottieView file={loading} />
		</div>
	);
}
