import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { magic } from "../../lib/magic-client";
import styles from "./NavBar.module.css";

interface Props {
	username?: string;
}

const NavBar: React.FC<Props> = () => {
	const router: NextRouter = useRouter();
	const [username, setUsername] = useState<string>("");
	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	// Get user data from Magic SDK service
	useEffect(() => {
		const getMagicUserData = async () => {
			try {
				const { email, publicAddress } =
					await magic?.user.getMetadata()!;

				if (email) {
					setUsername(email || "");
				}
			} catch (error) {
				console.log(error);
			}
		};

		getMagicUserData();
	}, []);

	const handleOnClickHome = (e: React.MouseEvent<HTMLLIElement>): void => {
		e.preventDefault();
		router.push("/");
	};

	const handleOnClickMyList = (e: React.MouseEvent<HTMLLIElement>): void => {
		e.preventDefault();
		router.push("/browse/my-list");
	};

	const handleShowDropdown = (
		e: React.MouseEvent<HTMLButtonElement>
	): void => {
		setShowDropdown(!showDropdown);
	};

	const handleSignOut = async (
		e: React.MouseEvent<HTMLAnchorElement>
	): Promise<void> => {
		e.preventDefault();

		try {
			await magic?.user.logout();
			const isLoggedIn = await magic?.user.isLoggedIn();

			if (!isLoggedIn) {
				router.push("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<a className={styles.logoLink} href='/'>
					<div className={styles.logoWrapper}>
						<Image
							src='/static/netflix.svg'
							alt='Netflix logo'
							width={120}
							height={30}
						/>
					</div>
				</a>

				<ul className={styles.navItems}>
					<li className={styles.navItem} onClick={handleOnClickHome}>
						Home
					</li>
					<li
						className={styles.navItem}
						onClick={handleOnClickMyList}
					>
						My List
					</li>
				</ul>

				<nav className={styles.navContainer}>
					<div>
						<button
							className={styles.usernameBtn}
							onClick={handleShowDropdown}
						>
							<p className={styles.username}>{username}</p>
							{/* Expand more icon */}
							<Image
								src='/static/expand_more.svg'
								alt='Expand more icon'
								width={40}
								height={40}
							/>
						</button>

						{showDropdown && (
							<div className={styles.navDropdown}>
								<div>
									<Link href='/login'>
										<a
											className={styles.linkName}
											onClick={handleSignOut}
										>
											Sign out
										</a>
									</Link>
									<div className={styles.lineWrapper}></div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default NavBar;
