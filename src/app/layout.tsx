import CookieProvider from '@/state/CookieProvider';
import Jotai from '../state/Jotai';
import ReactQuery from '../state/ReactQuery';
import './styles/globals.css';
import './styles/reset.css';
import GoogleAnalytics from './lib/GoogleAnalytics';

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
				{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
				) : null}
				<CookieProvider>
					<Jotai>
						<ReactQuery>
							<main className="bg-white h-[100vh] relative">{children}</main>
						</ReactQuery>
					</Jotai>
				</CookieProvider>
			</body>
		</html>
	);
}
