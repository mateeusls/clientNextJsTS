import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${inter.className} bg-white dark:bg-gray-300`}>
			<AuthProvider>
				<Component {...pageProps} />
				<ToastContainer limit={2} style={{ width: "430px" }} />
			</AuthProvider>
		</main>
	);
}
