import "../styles/globals.css";
import type { AppProps } from "next/app";
import { magic } from "../lib/magic-client";
import { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import Loader from "../components/loader/Loader";

function MyApp({ Component, pageProps }: AppProps) {
	const router: NextRouter = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const checkAuth = async () => {
			const isLoggedIn: boolean = await magic?.user.isLoggedIn()!;

			console.log({ isLoggedIn });

			if (isLoggedIn) {
				router.push("/");
			} else {
				router.push("/login");
			}
		};

		checkAuth();
	}, []);

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

	return isLoading ? <Loader /> : <Component {...pageProps} />;
}

export default MyApp;
