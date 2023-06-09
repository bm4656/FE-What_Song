'use client';

import Lottie, { LottieComponentProps } from 'lottie-react';

type Props = {
	file: LottieComponentProps | unknown;
	styles?: string;
};

export default function LottieView({ file, styles }: Props) {
	return <Lottie animationData={file} className={styles} />;
}
