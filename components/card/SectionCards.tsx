import React from "react";
import Card from "./Card";
import styles from "./SectionCards.module.css";

import type { VideosOrEmpty } from "../../types/video";
import type { CardSize } from "../../types/card";

interface Props {
	title: string;
	videos: VideosOrEmpty;
	size?: CardSize;
	children?: React.ReactNode;
}

const SectionCards: React.FC<Props> = ({
	title,
	videos = [],
	size = "medium",
	...props
}) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.cardWrapper}>
				{videos &&
					videos.map((video, index) => (
						<Card
							id={index}
							videoId={video.id}
							key={index}
							imgUrl={video.imgUrl!}
							size={size}
						/>
					))}
			</div>
		</section>
	);
};

export default SectionCards;
