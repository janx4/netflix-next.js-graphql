import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner/Banner";
import SectionCards from "../components/card/SectionCards";
import NavBar from "../components/navbar/NavBar";
import styles from "../styles/Home.module.css";

import { getVideos, getPopularVideos } from "../lib/videos";
import type { VideosOrEmpty } from "../types/video";

export async function getServerSideProps() {
	const disneyVideos: VideosOrEmpty = await getVideos("disney trailer");
	const travelVideos: VideosOrEmpty = await getVideos("travel");
	const productivityVideos: VideosOrEmpty = await getVideos("productivity");
	const popularVideos: VideosOrEmpty = await getPopularVideos();

	return {
		props: {
			disneyVideos,
			travelVideos,
			productivityVideos,
			popularVideos,
		},
	};
}

interface Props {
	disneyVideos: VideosOrEmpty;
	travelVideos: VideosOrEmpty;
	productivityVideos: VideosOrEmpty;
	popularVideos: VideosOrEmpty;
}

const Home: NextPage<Props> = ({
	disneyVideos,
	travelVideos,
	productivityVideos,
	popularVideos,
}) => {
	console.log({
		disneyVideos,
		travelVideos,
		productivityVideos,
		popularVideos,
	});

	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.main}>
				<NavBar username='huytruong641@gmail.com' />
				<Banner
					title='Clifford the red dog'
					subTitle="A young girl's love for a tiny puppy named Clifford makes the dog grow to an enormous size."
					imgUrl='/static/clifford.webp'
				/>

				<div className={styles.sectionWrapper}>
					<SectionCards
						title='Disney'
						videos={disneyVideos}
						size='large'
					/>
					<SectionCards
						title='Travel'
						videos={travelVideos}
						size='small'
					/>
					<SectionCards
						title='Productivity'
						videos={productivityVideos}
						size='medium'
					/>
					<SectionCards
						title='Popular'
						videos={popularVideos}
						size='small'
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
