import DashButton from "@/components/DashButton";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { Asterisk } from "phosphor-react";
import { memo } from "react";

function Art() {
	return (
		<div className="w-full min-h-screen">
			<Head>
				<title>ART | Serviços | CREA</title>
			</Head>
			<Sidebar />
			<div className="mt-10">
				<div className="flex flex-col items-center w-full md:w-[64rem] mx-auto rounded-lg">
					<div className="bg-yellow-600 w-full md:w-[55.5rem] p-7 md:p-12 rounded-t">
						<h1 className="text-center text-xl md:text-3xl text-white font-semibold mb-2">
							Serviços de ART
						</h1>
					</div>
					<div className="relative w-full flex justify-center py-40  bg-gray-300">
						<div className="absolute -top-4 md:-top-6 md:w-[52rem] md:px-24 grid grid-cols-3 gap-2 px-2">
							<DashButton
								route={"/services/art/cargo_funcao"}
								title={"Cargo ou Função"}
							>
								<Asterisk size={32} color="#050505" />
							</DashButton>
							<DashButton route={"#"} title={"Obra e Serviço"}>
								<Asterisk size={32} color="#050505" />
							</DashButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Art);
