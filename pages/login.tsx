import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import styles from "../styles/Login.module.css";
import * as validator from "../lib/validator";
import { magic } from "../lib/magic-client";

const Login: NextPage = () => {
	const router = useRouter();

	const [emailInputValue, setEmailInputValue] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	useEffect(() => {
		const handleRouteChange = () => {
			setIsLoading(false);
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		router.events.on("routeChangeError", handleRouteChange);

		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
			router.events.off("routeChangeError", handleRouteChange);
		};
	}, []);

	// Handle on change value in email input element
	const handleChangeEmail = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		const email: string = e.target.value;
		setEmailInputValue(email);

		if (!validator.isEmail(email)) {
			setErrorMessage("The email is invalid!");
			setIsDisabled(true);
		} else {
			setErrorMessage("");
			setIsDisabled(false);
		}
	};

	// Handle submit login form
	const handleLoginWithEmail = async (
		e: React.FormEvent<HTMLButtonElement | HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		if (!isDisabled && emailInputValue) {
			setIsLoading(true);

			// Authentication with magic.link service
			try {
				const didToken = await magic?.auth.loginWithMagicLink({
					email: emailInputValue,
				});

				// if the login progress is successful, then redirect to the home page
				if (didToken) {
					setIsRedirecting(true);
					router.push("/");
				}
			} catch (e) {
				console.log(e);
				setErrorMessage("Something went wrong!");
			}

			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix Login</title>
			</Head>

			<header className={styles.header}>
				<div className={styles.headerWrapper}>
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
				</div>
			</header>

			<main className={styles.main}>
				<form
					onSubmit={handleLoginWithEmail}
					className={styles.mainWrapper}
				>
					<h1 className={styles.loginHeader}>Login</h1>

					<input
						className={styles.emailInput}
						type='email'
						placeholder='Your email address...'
						value={emailInputValue}
						onChange={handleChangeEmail}
					/>
					<p className={styles.userMsg}>{errorMessage}</p>

					<button
						type='submit'
						className={clsx(
							styles.loginBtn,
							isLoading ? styles["loginBtn--disabled"] : "",
							isDisabled ? styles["loginBtn--disabled"] : "",
							isRedirecting ? styles["loginBtn--disabled"] : ""
						)}
						onClick={handleLoginWithEmail}
						disabled={isDisabled}
					>
						{isRedirecting
							? "Redirecting..."
							: isLoading
							? "Please wait..."
							: "Login"}
					</button>
				</form>
			</main>
		</div>
	);
};

export default Login;
