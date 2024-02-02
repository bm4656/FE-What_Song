'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

type Props = {
	children: ReactNode;
};

export default function ReactQuery({ children }: Props) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터 refetch
						refetchOnMount: false, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
						retry: 0, // API 요청 실패시 재시도 설정값
					},
				},
			})
	);
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
