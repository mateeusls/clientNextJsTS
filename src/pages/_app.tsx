import LoadingScreen from "@/components/Loading";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import router from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(false);

	function checkDevice() {
		if (
			navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/webOS/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/iPod/i) ||
			navigator.userAgent.match(/BlackBerry/i) ||
			navigator.userAgent.match(/Windows Phone/i)
		) {
			return true; // está utilizando celular
		} else {
			return false; // não é celular
		}
	}

	useEffect(() => {
		console.log(checkDevice());

		const handleStart = () => {
			setLoading(true);
		};

		const handleComplete = () => {
			setLoading(false);
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, []);

	return (
		<main className={`${inter.className} bg-white dark:bg-gray-300`}>
			<AuthProvider>
				{loading && <LoadingScreen />}
				<Component {...pageProps} />
				<ToastContainer limit={2} style={{ width: "430px" }} />
			</AuthProvider>
		</main>
	);
}
