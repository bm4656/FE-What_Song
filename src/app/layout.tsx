import './globals.css';
import Jotai from '@/Layout/Jotai';
import ReactQuery from '@/Layout/ReactQuery';

export const metadata = {
	title: 'What song',
	description: 'What song',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body>
				<Jotai>
					<ReactQuery>{children}</ReactQuery>
				</Jotai>
			</body>
		</html>
	);
}
