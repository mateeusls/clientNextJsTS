import Link from "next/link";
import { useRouter } from "next/router";
import { CaretLeft } from "phosphor-react";
import { memo } from "react";

interface BackRouterProps {
	title: string;
}

function BackRouter({ title }: BackRouterProps) {
	const router = useRouter();
	return (
		<>
			<div className="bg-yellow-500 py-2 md:hidden">
				<div className="flex md:w-[1024px] mx-auto px-2.5">
					<button
						type="button"
						onClick={() => router.push("/dashboard")}
						className=""
					>
						<CaretLeft size={25} color="#ffff" weight="bold" />
					</button>
					<p className="text-xl text-white font-medium mx-auto">{title}</p>
				</div>
			</div>
		</>
	);
}

export default memo(BackRouter);
