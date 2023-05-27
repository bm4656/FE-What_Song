// React-Carousel 라이브러리 사용을 위한 컴포넌트임
'use client';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

type Props = {
	children: React.ReactNode;
};

export default function ReactCarousel({ children }: Props) {
	//@ts-ignore
	return <ScrollingCarousel>{children}</ScrollingCarousel>;
}
