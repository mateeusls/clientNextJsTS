import Head from "next/head";
import { useContext } from "react";

import Sidebar from "@/components/Sidebar";
import { BackRouter } from "@/components/BackRouter";
import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getImage } from "@/lib/getData";

export default function Notifications({ foto }) {
	const { user } = useContext(AuthContext);

	return (
		<>
			<Head>
				<title>{user?.name} - CREA APP</title>
			</Head>
			<Sidebar img={foto} />
			<BackRouter title="NOTIFICAÇÕES" />
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

	const { foto } = await getImage(rnp);

	return {
		props: {
			foto,
		},
	};
};
