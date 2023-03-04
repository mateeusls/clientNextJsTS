import DashButton from "@/components/DashButton";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import {
	ClipboardText,
	MagnifyingGlass,
	NotePencil,
	Pencil,
} from "phosphor-react";
import { memo } from "react";

function Services() {
	return (
		<div className="w-full min-h-screen">
			<Head>
				<title>Serviços | CREA</title>
			</Head>
			<Sidebar />
			<div className="mt-10">
				<div className="w-80 md:w-96 mx-auto">
					<div className="relative flex flex-col">
						<div className="bg-blue-800 rounded-lg p-6 ">
							<h1 className="text-center text-xl font-semibold text-white mb-2">
								O que você procura?
							</h1>
							<div className="relative">
								<label htmlFor="search" className="relative">
									<input
										type="text"
										id="search"
										className="border-blue-400 px-3 py-2 md:py-3 border outline-none rounded-lg w-full placeholder:font-medium"
										placeholder="Buscar"
									/>
									<span className="absolute right-4 -top-0.5">
										<MagnifyingGlass size={24} color="#050505" />
									</span>
								</label>
							</div>
						</div>
						<p className="absolute top-28 left-0 right-0 text-center after:content-['\25bc'] after:block after:text-xl md:after:text-5xl after:text-blue-800 z-30"></p>
					</div>
				</div>
				<div className="flex flex-col items-center w-full lg:w-[55.5rem] mx-auto rounded-lg">
					<div className="bg-yellow-600 w-full md:w-full p-7 md:p-12 rounded-t">
						<h1 className="text-center text-xl md:text-3xl text-white font-semibold mb-2">
							Serviços
						</h1>
					</div>
					<div className="relative w-full flex justify-center py-40  bg-gray-300">
						<div className="absolute -top-4 md:-top-6 md:w-[52rem] md:px-24 grid grid-cols-3 gap-2 px-2">
							<DashButton route={"/services/register"} title={"Registro"}>
								<NotePencil size={32} color="#050505" />
							</DashButton>
							<DashButton route={"/services/art"} title={"ART"}>
								<Pencil size={32} color="#050505" />
							</DashButton>
							<DashButton route={"#"} title={"CAT"}>
								<ClipboardText size={32} color="#050505" />
							</DashButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Services);

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	const { ["creapp.token"]: token } = parseCookies(ctx);

// 	if (!token) {
// 		return {
// 			redirect: {
// 				destination: "/login",
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {},
// 	};
// };
