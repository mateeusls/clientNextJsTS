import { BackRouter } from "@/components/BackRouter";
import Sidebar from "@/components/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { getCard, getImage } from "@/lib/getData";
import { cpfMask } from "@/lib/masks";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext } from "react";

export default function Me({ tipoCarteira, foto }) {
	const { user } = useContext(AuthContext);

	return (
		<>
			<Head>
				<title>{user?.name} - CREA APP</title>
			</Head>
			<Sidebar img={foto} />
			<BackRouter title="Perfil Profissional" />
			<div className="w-[22rem]  mx-auto mt-5 bg-white rounded-lg shadow-md">
				<div className="p-3">
					<h5 className="mb-2 border-b-2 border-blue-800 text-base font-bold tracking-tight text-blue-800">
						Informações do Profissional
					</h5>

					<div className="grid grid-cols-1 gap-2">
						<div>
							<strong className="md:text-lg font-medium text-blue-800 dark:text-blue-800">
								Nome
							</strong>
							<p className="text-md">{user?.name}</p>
						</div>
						<div className="grid grid-cols-2 items-center">
							<div>
								<strong className=" font-medium text-blue-800 dark:text-blue-800">
									CPF
								</strong>
								<p className="text-sm">{cpfMask(user?.cpf)}</p>
							</div>
							<div>
								<strong className=" font-medium text-blue-800 dark:text-blue-800">
									Tipo
								</strong>
								<p className="text-sm">{tipoCarteira}</p>
							</div>
						</div>
						<div className="grid grid-cols-2 items-center">
							<div>
								<strong className=" font-medium text-blue-800 dark:text-blue-800">
									Registro Crea-N°
								</strong>
								<p className="text-sm">{user?.rnp}</p>
							</div>
							<div>
								<strong className=" font-medium text-blue-800 dark:text-blue-800">
									Data de Emissão
								</strong>
								<p className="text-sm">00/00/0000</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { ["creapp.token"]: token, ["creapp.user"]: rnp } = parseCookies(ctx);

	if (!token) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	const { tipoCarteira } = await getCard(rnp);
	const { foto } = await getImage(rnp);

	return {
		props: {
			foto,
			tipoCarteira,
		},
	};
};
