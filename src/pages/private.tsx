import Navbar from "@/components/Navbar";
import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext } from "react";

export default function Private() {
	const { user } = useContext(AuthContext);
	return (
		<>
			<Navbar />
			<div>
				<h1>Private</h1>
				<p>{user?.name}</p>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { ["creapp.token"]: token } = parseCookies(ctx);

	if (!token) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
