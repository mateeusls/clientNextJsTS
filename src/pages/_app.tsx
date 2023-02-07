import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${inter.className} bg-gray-300 h-screen`}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</main>
	);
}
