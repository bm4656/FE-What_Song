import Jotai from '@/Layout/jotai';
import './globals.css';

export const metadata = {
	title: 'What song',
	description: 'What song',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body>
				<Jotai>{children}</Jotai>
			</body>
		</html>
	);
}
