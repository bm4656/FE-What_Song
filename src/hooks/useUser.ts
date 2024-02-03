import { useQuery } from '@tanstack/react-query';
import { loginApis } from '@/app/service/login';

export default function useUser() {
	const { data, refetch, isLoading } = useQuery(['user', 'me'], loginApis.getUserInfo, {
		select: (res) => res.data,
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			// console.log(error);
		},
		staleTime: 1000 * 6 * 5,
	});
	return { data, refetch, isLoading };
}
