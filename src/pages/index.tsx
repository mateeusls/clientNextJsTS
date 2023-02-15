import Head from "next/head";
import Image from "next/image";

import brasaoImg from "@/assets/brasao.png";
import CreaPe from "@/components/CreaPe";

export default function Slash() {
	return (
		<>
			<Head>
				<meta httpEquiv="refresh" content="1; url=/login" /> <title>CREA</title>
			</Head>
			<div className="bg-blue-800 w-screen h-screen flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<Image
						src={brasaoImg}
						width={0}
						height={0}
						alt={""}
						className="w-48"
					/>
					<CreaPe color="text-white" paragraph="" title="font-bold" />
				</div>
			</div>
		</>
	);
}
