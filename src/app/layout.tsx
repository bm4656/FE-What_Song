import './styles/globals.css';
import './styles/reset.css';
import Jotai from '@/Layout/Jotai';
import ReactQuery from '@/Layout/ReactQuery';

export const metadata = {
	title: 'What Song',
	description: '🎤 음악 같이 듣기 서비스',
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
