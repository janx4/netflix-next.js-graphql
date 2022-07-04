export type Video = {
	id: string | number | undefined;
	title: string;
	imgUrl: string;
};

export type VideoDetails = {
	readonly id?: string | number | undefined;
	title: string;
	imgUrl?: string;
	publishTime: string;
	description: string;
	channelTitle: string;
	statistics: {
		readonly viewCount: number | string;
		readonly favoriteCount?: number | string;
		readonly likeCount?: number | string;
		readonly viewCount?: number | string;
	};
};

export type VideosOrEmpty = VideoDetails[] | [];
