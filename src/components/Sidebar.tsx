import { AuthContext } from "@/contexts/AuthContext";
import { cpfMask } from "@/lib/masks";
import Image from "next/image";
import { useRouter } from "next/router";
import {
	Bell,
	IdentificationCard,
	List,
	MagnifyingGlass,
	Newspaper,
	Power,
	XCircle,
} from "phosphor-react";
import { memo, useContext, useState } from "react";
import EscClose from "./EscClose";

function Sidebar({ img }) {
	const router = useRouter();
	const { signOut, user } = useContext(AuthContext);
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<>
			<nav className="flex justify-center items-center bg-blue-800 py-2 px-4">
				<div className="flex items-center justify-between w-full md:w-[1024px]">
					<div className="flex items-center gap-2">
						<div className="flex items-center">
							{!showSidebar && (
								<button
									className="cursor-pointer md:hidden outline-none left-3 top-5 z-50"
									onClick={() => setShowSidebar(!showSidebar)}
								>
									<List size={38} color="#ffff" />
								</button>
							)}
						</div>
						<div>
							<p className="text-sm md:text-xl font-extrabold text-white">
								CREA-PE
							</p>
							<p className="text-[4px] md:text-[5px] w-16 md:w-20 text-white  text-center mx-auto">
								Conselho Regional de Engenharia e Agronomia de Pernambuco
							</p>
						</div>
					</div>
					<ul className="hidden md:flex gap-4">
						<li className="text-lg text-white">
							<button type="button" onClick={() => router.push("/dashboard")}>
								Início
							</button>
						</li>
						<li className="text-lg text-white">
							<button type="button" onClick={() => router.push("/me")}>
								Perfil
							</button>
						</li>
						<li className="text-lg text-white">
							<button type="button" onClick={() => router.push("#")}>
								Certidão
							</button>
						</li>
					</ul>
					<div className="">
						<ul className="flex items-center ">
							<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
								<button
									type="button"
									onClick={() => router.push("/notifications")}
								>
									<Bell className="md:hidden" size={30} color="#ffff" />
									<Bell className="hidden md:block" size={40} color="#ffff" />
								</button>
							</li>
							<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
								<button type="button" onClick={() => router.push("/card")}>
									<IdentificationCard
										className="md:hidden"
										size={30}
										color="#ffff"
									/>
									<IdentificationCard
										className="hidden md:block"
										size={40}
										color="#ffff"
									/>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div className="relative">
				<EscClose
					onClose={() => setShowSidebar(false)}
					statusSideBar={showSidebar}
				>
					<div
						className={` top-0 left-0 w-72 bg-blue-800  p-10 pl-20 text-white fixed h-full z-40 ${
							showSidebar ? "translate-x-0 " : "-translate-x-full"
						}`}
					>
						<button
							className="flex text-4xl text-white items-center cursor-pointer absolute top-3 right-4 outline-none z-50"
							onClick={() => setShowSidebar(!showSidebar)}
						>
							<XCircle size={28} color="#ffff" />
						</button>
						<div className="bg-yellow-500 absolute top-0 left-0 w-full h-32">
							<div className="flex items-center mt-9 px-3 gap-2">
								<Image
									src={`data:image/png;base64,${img}`}
									width={0}
									height={0}
									alt={user?.name}
									className="h-20 w-20 rounded-full"
								/>
								<div>
									<p>Olá,</p>
									<p>
										<strong>{user?.name}</strong>
									</p>
									<p>
										<strong>{user?.cpf ? cpfMask(user?.cpf) : ""}</strong>
									</p>
								</div>
							</div>
						</div>
						<div className="absolute top-32 left-0 w-ful p-3">
							<ul className="">
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<List size={30} color="#ffff" />
									<button
										type="button"
										onClick={() => router.push("/dashboard")}
									>
										Início
									</button>
								</li>
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<Bell size={30} color="#ffff" />
									<button
										type="button"
										onClick={() => router.push("/notifications")}
									>
										Notificações
									</button>
								</li>
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<IdentificationCard size={30} color="#ffff" />
									<button type="button" onClick={() => router.push("/card")}>
										Carteira Profissional
									</button>
								</li>
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<MagnifyingGlass size={30} color="#ffff" />
									<button type="button" onClick={() => router.push("/me")}>
										Perfil Profissional
									</button>
								</li>
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<Newspaper size={32} color="#ffff" />
									<button
										className="text-start"
										type="button"
										onClick={() => router.push("#")}
									>
										Certidão de Registro e Quitação
									</button>
								</li>
								<li className="p-2 hover:bg-blue-700 rounded-md">
									<button
										onClick={signOut}
										type="button"
										className="flex items-center gap-4 hover:bg-blue-700 rounded-md w-full"
									>
										<Power size={30} color="#ffff" />
										Sair
									</button>
								</li>
							</ul>
						</div>
					</div>
				</EscClose>
			</div>
		</>
	);
}

export default memo(Sidebar);
