import Link from "next/link";
import { EnvelopeSimple } from "phosphor-react";
import { memo } from "react";

function NotificationItem({ notification }) {
	return (
		<Link
			href={`/notifications/${notification.id}`}
			className="bg-blue-800 w-80 md:w-full h-24 p-4 mx-auto flex flex-col rounded-3xl"
		>
			<div className="text-right">
				<p className="text-blue-300 brightness-90 text-xs">10.02.2023 14:12</p>
			</div>
			<div className="h-full">
				<div className="grid grid-flow-col-dense items-center gap-2">
					<EnvelopeSimple size={40} color="#ffff" weight="regular" />
					<h1 className="truncate text-lg text-white">{notification.title}</h1>
				</div>
			</div>
		</Link>
	);
}

export default memo(NotificationItem);
