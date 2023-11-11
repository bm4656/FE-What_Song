export type SimpleUser = {
	email: string;
	imgURL: string;
	memberSeq: number;
	nickname: string;
	alreadyFollowing: boolean;
};

export type RawUser = SimpleUser & {
	innerNickname: string;
	memberRole: string;
	oauthId: string;
	profileMusic: string;
	refreshToken: string;
	socialType: string;
};
