import Link from "next/link";
import { useRouter } from "next/router";
import { CaretLeft } from "phosphor-react";

interface BackRouterProps {
	title: string;
}

export function BackRouter({ title }: BackRouterProps) {
	const router = useRouter();
	return (
		<>
			<div className="relative bg-yellow-500 flex justify-center py-2">
				<button
					type="button"
					onClick={() => router.push("/dashboard")}
					className="absolute top-3 left-10"
				>
					<CaretLeft size={24} color="#ffff" weight="bold" />
				</button>
				<p className="text-2xl text-white font-medium">{title}</p>
			</div>
		</>
	);
}
