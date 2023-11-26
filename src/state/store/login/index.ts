import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type User = null | {
	email: string;
	imgURL: string | null;
	memberSeq: number;
	nickname: string;
	oauthId: string;
};

type RegisterKakaoInfo = {
	id: string;
	kakao_account: {
		email: string;
	};
};

export const UserInfoAtom = atomWithStorage<User>('userInfo', null);

export const registerInfo = atom<RegisterKakaoInfo>({
	id: '',
	kakao_account: {
		email: '',
	},
});
