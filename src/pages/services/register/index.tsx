import DashButton from "@/components/DashButton";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { NotePencil } from "phosphor-react";
import { memo } from "react";

function Registro() {
	return (
		<div className="w-full min-h-screen">
			<Head>
				<title>Registros | Serviços | CREA</title>
			</Head>
			<Sidebar />
			<div className="mt-10">
				<div className="flex flex-col items-center w-full lg:w-[55.5rem] mx-auto rounded-lg">
					<div className="bg-yellow-600 w-full lg:w-[55.5rem] p-7 md:p-12 rounded-t">
						<h1 className="text-center text-xl md:text-3xl text-white font-semibold mb-2">
							Serviços de Registro
						</h1>
					</div>
					<div className="relative w-full flex justify-center py-40  bg-gray-300">
						<div className="absolute -top-4 md:-top-6 md:w-[52rem] md:px-24 grid grid-cols-3 gap-2 px-2">
							<DashButton
								route={"/services/register/registro_profissional"}
								title={"Registro Profissional"}
							>
								<NotePencil size={32} color="#050505" />
							</DashButton>
							<DashButton route={"#"} title={"Registro de Empresa"}>
								<NotePencil size={32} color="#050505" />
							</DashButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Registro);

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
