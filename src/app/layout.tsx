import Jotai from './stateManagement/Jotai';
import ReactQuery from './stateManagement/ReactQuery';
import './styles/globals.css';
import './styles/reset.css';

export const metadata = {
	title: 'What Song',
	description: '🎤 음악 같이 듣기 서비스',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
		userScalable: 'no',
		telephone: 'no',
		viewportFit: 'cover',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body className="max-w-[50rem] mx-auto">
				<Jotai>
					<ReactQuery>{children}</ReactQuery>
				</Jotai>
			</body>
		</html>
	);
}
