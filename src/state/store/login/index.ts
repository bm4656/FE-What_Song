import { atomWithStorage } from 'jotai/utils';

type User = null | {
	email: string;
	imgURL: string | null;
	memberSeq: number;
	nickname: string;
	oauthId: string;
};

export const UserInfoAtom = atomWithStorage<User>('userInfo', null);
