import React from "react";
import styles from "./Banner.module.css";

interface Props {
	title: string;
	subTitle: string;
	imgUrl: string;
}

const Banner: React.FC<Props> = ({ title, subTitle, imgUrl }) => {
	const handleOnPlay = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log(event.target);
	};

	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.left}>
					<div className={styles.nseriesWrapper}>
						<p className={styles.firstLetter}>N</p>
						<p className={styles.series}>S E R I E S</p>
					</div>
					<h3 className={styles.title}>{title}</h3>
					<h3 className={styles.subTitle}>{subTitle}</h3>
					<div className={styles.playBtnWrapper}>
						<button
							className={styles.btnWithIcon}
							onClick={handleOnPlay}
						>
							Play
						</button>
					</div>
				</div>
			</div>
			<div
				className={styles.bannerImg}
				style={{
					backgroundImage: `url(${imgUrl})`,
					width: "100%",
					height: "100%",
					position: "absolute",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			></div>
		</div>
	);
};

export default Banner;
