import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import BackRouter from "@/components/BackRouter";
import NotificationItem from "@/components/NotificationItem";
import Sidebar from "@/components/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function Notifications() {
	const { user } = useContext(AuthContext);
	const router = useRouter();
	const [newNotification, setNewNotification] = useState("");
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
			<div className="md:w-[1024px] mx-auto py-4 grid gap-2">
				<div className="hidden md:flex gap-3 border-b-2 border-blue-800 py-5 text-blue-800">
					<h1 className="text-2xl font-bold">
						<button type="button" onClick={() => router.push("/dashbord")}>
							Back
						</button>
						<Link href="/notifications/all" className="active:text-white">
							Todas
						</Link>
					</h1>
					<h1 className="text-2xl font-bold">
						<Link href="/notifications/update" className="active:text-white">
							Atualizações
						</Link>
					</h1>
					<h1 className="text-2xl font-bold">
						<Link href="/notifications/info" className="active:text-white">
							Informações
						</Link>
					</h1>
				</div>

				<input
					onChange={(e) => setNewNotification(e.target.value)}
					value={newNotification}
				/>
				{notifications.map((notification) => (
					<NotificationItem key={notification.id} notification={notification} />
				))}
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
