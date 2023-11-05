export type SimpleUser = {
	email: string;
	imgURL: string;
	memberSeq: number;
	nickname: string;
};

export type RawUser = SimpleUser & {
	innerNickname: string;
	memberRole: string;
	oauthId: string;
	profileMusic: string;
	refreshToken: string;
	socialType: string;
	// following: number;
	// followers: number;
};
