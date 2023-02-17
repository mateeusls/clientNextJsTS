import Router from "next/router";
import { ReactNode } from "react";

interface DashButtonProps {
	route: string;
	title: string;
	children: ReactNode;
	position?: string;
}

export default function DashButton({
	route,
	title,
	children,
	position,
}: DashButtonProps) {
	return (
		<button
			className={`flex col-start-${position} flex-col items-center justify-center gap-2 p-3 md:p-4  bg-white hover:brightness-75 rounded-xl border-2 border-blue-300`}
			onClick={() => Router.push(`${route}`)}
		>
			{children}
			<p className="">{title}</p>
		</button>
	);
}
