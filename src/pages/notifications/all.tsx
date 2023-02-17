import BackRouter from "@/components/BackRouter";
import NotificationItem from "@/components/NotificationItem";
import Sidebar from "@/components/Sidebar";
import { getImage } from "@/lib/getData";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { memo, useEffect, useState } from "react";

function AllNotification({ foto }) {
	const router = useRouter();
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		async function getNotifications() {
			const { data } = await axios.get(
				"https://jsonplaceholder.typicode.com/posts"
			);
			setNotifications(data);
		}

		getNotifications();
	}, []);

	return (
		<>
			<Head>
				<title>Notificações | CREA</title>
			</Head>
			<Sidebar />
			<BackRouter title="NOTIFICAÇÕES" />
			<div className="md:w-[1024px] mx-auto py-4 grid gap-2 bg-yellow-200">
				<div className="hidden md:flex gap-3 border-b-2 border-blue-800 py-5 text-blue-800">
					<h1 className="text-2xl font-bold">
						<button
							onClick={() => router.push("/notifications/all")}
							type="button"
							className="active:text-white"
						>
							Todas
						</button>
					</h1>
					<h1 className="text-2xl font-bold">
						<button
							onClick={() => router.push("/notifications/update")}
							type="button"
							className="active:text-white"
						>
							Atualizações
						</button>
					</h1>
					<h1 className="text-2xl font-bold">
						<button
							onClick={() => router.push("/notifications/info")}
							type="button"
							className="active:text-white"
						>
							Informações
						</button>
					</h1>
				</div>

				{notifications.map((notification) => (
					<NotificationItem key={notification.id} notification={notification} />
				))}
			</div>
		</>
	);
}

export default memo(AllNotification);

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
