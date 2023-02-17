import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="pt-BR">
			<Head>
				<meta charSet="utf-8" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#044a8c" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
