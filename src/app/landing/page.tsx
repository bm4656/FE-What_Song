import LottieView from '@/components/LottieView';
import loginMain from '../../../public/lottie/loginMain.json';

export default function LandingPage() {
	return (
		<div className="wrap">
			<p className="text-[2.2rem] font-bold mb-[20%]">
				What Song은
				<br />
				더 나은 서비스를 위해
				<br />
				점검 작업을 진행 중이에요!
				<br />더 좋은 모습으로 돌아올게요! ✨
			</p>
			<LottieView file={loginMain} />
		</div>
	);
}
