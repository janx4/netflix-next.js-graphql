import React, { useState } from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import { motion } from "framer-motion";
import clsx from "clsx";

import type { CardSize } from "../../types/card";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";

interface Props {
	id?: number;
	videoId: string | number | undefined;
	imgUrl: string;
	size: CardSize;
}

const classMap = {
	large: styles?.lgItem,
	medium: styles?.mdItem,
	small: styles?.smItem,
};

const Card: React.FC<Props> = ({ id, videoId, imgUrl, size }) => {
	const router: NextRouter = useRouter();
	const [imgSrc, setImgSrc] = useState<string>(imgUrl);

	const handOnError = (): void => {
		setImgSrc("/static/video_on_error.png");
	};

	const animate = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

	return (
		<div className={styles.container}>
			<Link href={`/video/${videoId}`}>
				<motion.div
					whileHover={animate}
					className={clsx(styles.imgMotionWrapper, classMap[size])}
					// onClick={() => router.push(`/video/${videoId}`)}
				>
					<Image
						src={imgSrc}
						alt='card image'
						layout='fill'
						onError={handOnError}
						className={styles.cardImg}
					/>
				</motion.div>
			</Link>
		</div>
	);
};

export default Card;
