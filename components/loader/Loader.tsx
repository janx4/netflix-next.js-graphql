import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.loader}></div>
			<h2 className={styles.loader__text}>Loading...</h2>
		</div>
	);
};

export default Loader;
