import Sidebar from "@/components/Sidebar";
import { getImage } from "@/lib/getData";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";

export default function Dashboard({ foto }) {
	return (
		<>
			<Head>
				<title>Dashboard | CREA</title>
			</Head>
			<Sidebar img={foto} />
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
