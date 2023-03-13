import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="pt-BR">
			<Head>
				<meta charSet="utf-8" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#044a8c" />
				<meta name="description" content="" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</Head>
			<body className="scrollbar scrollbar-thumb-slate-400 scrollbar-track-gray-100 scrollbar-w-2 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
