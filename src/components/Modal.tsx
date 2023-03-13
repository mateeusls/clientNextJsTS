import { XCircle } from "lucide-react";
import { ReactNode } from "react";
import Modaal from "react-modal";

interface ModalProps {
	title?: string;
	children?: ReactNode;
	setIsOpenModal: (value: boolean) => void;
	isOpenModal: boolean;
}

export default function Modal({
	title,
	children,
	setIsOpenModal,
	isOpenModal,
}: ModalProps) {
	return (
		<Modaal
			isOpen={isOpenModal}
			onRequestClose={() => setIsOpenModal(false)}
			style={{
				overlay: {
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				},
			}}
			className="h-screen overflow-auto p-5 outline-none inset-10 bg-transparent"
		>
			<div className="bg-blue-800 w-full md:w-[55.5rem] mx-auto rounded-lg shadow-lg py-6 px-4">
				<div className="flex justify-between items-center py-2">
					<h2 className="text-xl font-bold text-white">{title}</h2>
					<button
						onClick={() => setIsOpenModal(false)}
						className="text-2xl font-bold"
					>
						<XCircle size={22} color="red" />
					</button>
				</div>
				<p className="border-b-2 border-blue-600 animate-pulse "></p>
				<div className="">{children}</div>
			</div>
		</Modaal>
	);
}
