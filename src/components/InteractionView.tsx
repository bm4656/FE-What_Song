'use client';

import LottieView from '@/components/LottieView';
import heartEmoji from '../../public/lottie/heartEmoji.json';

type Props = {
	emoji: string;
};

export default function InteractionView({ emoji }: Props) {
	return (
		<span className="fixed inset-0 w-full h-full z-50">
			<LottieView file={heartEmoji} styles="absolute w-full h-full" />
		</span>
	);
}
