import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type User = null | {
	email: string;
	imgURL: string | null;
	memberSeq: number;
	nickname: string;
	oauthId: string;
};

export type RegisterKakaoInfo = {
	refreshToken: string;
	accessToken: string;
	innerNickName?: string;
};

export const UserInfoAtom = atomWithStorage<User>('userInfo', null);

export const registerInfo = atom<RegisterKakaoInfo>({
	refreshToken: '',
	accessToken: '',
	innerNickName: '',
});
