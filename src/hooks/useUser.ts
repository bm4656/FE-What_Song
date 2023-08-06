import { loginApis } from '@/app/service/login';
import { getCookie } from '@/constants/cookie';
import { useQuery } from '@tanstack/react-query';

export default function useUser() {
	const { data, refetch, isLoading } = useQuery(['user', 'me'], loginApis.getUserInfo, {
		// select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: Boolean(getCookie('accessToken')) || Boolean(getCookie('refreshToken')),
	});
	return { data, refetch, isLoading };
}
