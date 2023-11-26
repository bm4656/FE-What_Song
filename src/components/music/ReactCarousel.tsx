'use client';

import { ScrollingCarousel } from '@trendyol-js/react-carousel';

type Props = {
	children: React.ReactNode;
};

// React-Carousel 라이브러리 사용을 위한 컴포넌트임
export default function ReactCarousel({ children }: Props) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <ScrollingCarousel>{children}</ScrollingCarousel>;
}
