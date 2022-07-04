import React from "react";
import styles from "../../styles/Video.module.css";
import Modal from "react-modal";
import type { GetStaticProps, NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import clsx from "clsx";
import { VideoDetails } from "../../types/video";

Modal.setAppElement("#__next");

export async function getStaticProps() {
	const video: VideoDetails = {
		publishTime: "",
		title: "",
		description: "",
		channelTitle: "",
		statistics: {
			viewCount: 1,
		},
	};

	return {
		props: {
			video,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const listOfVideoIds = ["4zH5iYM4wJo", "dLptjP1RKmQ", "fkPd-QttaSk"];
	const paths = listOfVideoIds.map((videoId) => ({ params: { videoId } }));

	return {
		paths,
		fallback: "blocking",
	};
}

interface Props {
	video: VideoDetails;
}

const Video: NextPage<Props> = ({ video }) => {
	const router: NextRouter = useRouter();
	const { videoId } = router.query;

	const {
		publishTime,
		title,
		description,
		channelTitle,
		statistics: { viewCount },
	} = video;

	return (
		<div className={styles.container}>
			<Modal
				isOpen={true}
				contentLabel='Watch the video'
				onRequestClose={() => router.back()}
				className={styles.modal}
				overlayClassName={styles.overlay}
			>
				<div>
					<iframe
						className={styles.videoPlayer}
						id='ytplayer'
						width='100%'
						height='360'
						src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&controls=0&rel=0`}
						frameBorder='0'
					></iframe>
				</div>

				<div className={styles.modalBody}>
					<div className={styles.modalBodyContent}>
						<div className={styles.col1}>
							<p className={styles.publishTime}>{publishTime}</p>
							<p className={styles.title}>{title}</p>
							<p className={styles.description}>{description}</p>
						</div>
						<div className={styles.col2}>
							<p
								className={clsx(
									styles.subText,
									styles.subTextWrapper
								)}
							>
								<span className={styles.textColor}>Cast: </span>
								<span className={styles.channelTitle}>
									{channelTitle}
								</span>
							</p>
							<p
								className={clsx(
									styles.subText,
									styles.subTextWrapper
								)}
							>
								<span className={styles.textColor}>
									View Count:{" "}
								</span>
								<span className={styles.channelTitle}>
									{viewCount}
								</span>
							</p>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Video;
