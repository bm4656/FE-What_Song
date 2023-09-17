import axios from 'axios';
import { cookies } from 'next/headers';

const server = axios.create({
	baseURL: 'https://5a5f-2001-2d8-e2b4-1ed2-4d56-cee3-97d-d6a9.ngrok-free.app/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		'ngrok-skip-browser-warning': '69420',
	},
});

server.interceptors.request.use(async (config) => {
	const token = cookies().get('accessToken')?.value;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
export default server;
