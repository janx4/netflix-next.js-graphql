import axios, { AxiosResponse } from "axios";
import videosData from "../data/videos.json";

import type { VideoDetails, VideosOrEmpty } from "../types/video";

//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=VN&key=[YOUR_API_KEY]

const fetchVideos = async (extraUrl: string): Promise<any> => {
	const YOUTUBE_API_KEY: string | undefined = process.env.YOUTUBE_API_KEY;
	const API_URL: string = `https://youtube.googleapis.com/youtube/v3/${extraUrl}&maxResults=25&key=${YOUTUBE_API_KEY}`;

	try {
		const response: AxiosResponse = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const getVideosByDetails = async (
	urlDetails: string
): Promise<VideosOrEmpty> => {
	try {
		const videosData = await fetchVideos(urlDetails);
		const items: any[] = videosData?.items;

		// If error or items is undefined
		if (!items) {
			return [];
		}

		// console.log(items);

		const videos: Array<VideoDetails> = items.map((item) => {
			const id = item?.id?.videoId || item.id;
			return {
				id,
				title: item.snippet.title,
				imgUrl: item.snippet.thumbnails.high.url,
				description: item.snippet.description,
				publishTime: item.snippet.publishedAt,
				channelTitle: item.snippet.channelTitle,
				statistics: item.statistics?.viewCount
					? item.statistics
					: { viewCount: 0 },
			};
		});

		return videos;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getVideos = async (
	searchQuery: string
): Promise<VideosOrEmpty> => {
	const URL = `search?part=snippet&q=${searchQuery}`;
	return await getVideosByDetails(URL);
};

export const getVideoById = async (videoId: string): Promise<VideosOrEmpty> => {
	const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
	return await getVideosByDetails(URL);
};

export const getPopularVideos = async (): Promise<VideosOrEmpty> => {
	const URL =
		"videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=VN";
	return await getVideosByDetails(URL);
};

//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]
