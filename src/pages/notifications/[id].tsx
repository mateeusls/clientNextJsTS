import axios from "axios";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

type Notification = {
	id: number;
	title: string;
	body: string;
	userId: number;
};

function NotificationsPage() {
	const router = useRouter();
	const { id } = router.query;
	const [notification, setNotification] = useState<Notification>();

	useEffect(() => {
		async function getNotifications() {
			const { data } = await axios.get(
				`https://jsonplaceholder.typicode.com/posts/${id}`
			);
			setNotification(data);
		}

		getNotifications();
	}, [id]);

	return (
		<>{notification && <p key={notification.id}>{notification.title}</p>}</>
	);
}

export default memo(NotificationsPage);
