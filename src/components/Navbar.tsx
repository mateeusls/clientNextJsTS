import { List } from "phosphor-react";
import { useState } from "react";
import EscClose from "./EscClose";

export default function Navbar() {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<>
			{showSidebar ? (
				<button
					className="flex text-4xl text-white items-center cursor-pointer fixed left-10 top-6 z-50"
					onClick={() => setShowSidebar(!showSidebar)}
				>
					x
				</button>
			) : (
				<button
					className="flex text-4xl text-black items-center cursor-pointer fixed outline-none left-10 top-6 z-50"
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<List size={32} color="#aad7ee" />
				</button>
			)}

			<EscClose
				statusSideBar={showSidebar}
				onClose={() => setShowSidebar(!showSidebar)}
			>
				<div
					className={`top-0 left-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40 ${
						showSidebar ? "translate-x-0 " : "-translate-x-full"
					}`}
				>
					<h3 className="mt-20 text-4xl font-semibold text-white">
						I am a sidebar
					</h3>
				</div>
			</EscClose>
		</>
	);
}
