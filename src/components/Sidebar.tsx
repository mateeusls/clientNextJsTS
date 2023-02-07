import { AuthContext } from "@/contexts/AuthContext";
import { cpfMask } from "@/lib/masks";
import Image from "next/image";
import Link from "next/link";
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
import { useContext, useState } from "react";
import EscClose from "./EscClose";

export default function Sidebar({ img }) {
	const router = useRouter();
	const { signOut, user } = useContext(AuthContext);
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<>
			<nav className="flex items-center justify-between flex-wrap bg-blue-800 py-2 px-4">
				<div className="flex items-center gap-2">
					<div className="flex items-center">
						{!showSidebar && (
							<button
								className="cursor-pointer outline-none left-3 top-5 z-50"
								onClick={() => setShowSidebar(!showSidebar)}
							>
								<List size={38} color="#ffff" />
							</button>
						)}
					</div>
					<div>
						<p className="text-sm md:text-base font-extrabold text-white">
							CREA-PE
						</p>
						<p className="text-[4px] text-white w-16 text-center mx-auto">
							Conselho Regional de Engenharia e Agronomia de Pernambuco
						</p>
					</div>
				</div>
				<div className="">
					<ul className="flex items-center ">
						<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
							<a href="#">
								<Bell size={30} color="#ffff" />
							</a>
						</li>
						<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
							<button type="button" onClick={() => router.push("/card")}>
								<IdentificationCard size={30} color="#ffff" />
							</button>
						</li>
					</ul>
				</div>
			</nav>

			<div className="relative">
				<EscClose
					onClose={() => setShowSidebar(false)}
					statusSideBar={showSidebar}
				>
					<div
						className={` top-0 left-0 w-72 bg-blue-600  p-10 pl-20 text-white fixed h-full z-40 ${
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
									width={30}
									height={0}
									alt="Mateus Lopes"
									className="h-auto w-14 rounded-full"
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
									<Link href="/dashboard">Início</Link>
								</li>
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<Bell size={30} color="#ffff" />
									<Link href="#">Notificações</Link>
								</li>
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<IdentificationCard size={30} color="#ffff" />
									<Link href="/card">Carteira Profissional</Link>
								</li>
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<MagnifyingGlass size={30} color="#ffff" />
									<Link href="/me">Perfil Profissional</Link>
								</li>
								<li className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded-md">
									<Newspaper size={30} color="#ffff" />
									<Link href="#">Certidão de Registro e Quitação</Link>
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
