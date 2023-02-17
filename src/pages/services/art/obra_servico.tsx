import ButtonSubmit from "@/components/ButtonSubmit";
import Sidebar from "@/components/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import { memo, useContext } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
	name: string;
};

function ObraServico() {
	const { user } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const handleSubmitForm = async (data: Inputs) => {};

	return (
		<div className="w-full min-h-screen">
			<Head>
				<title>Obra e Serviço | ART | CREA</title>
			</Head>
			<Sidebar />
			<div className="mt-10">
				<div className="flex flex-col items-center w-full md:w-[64rem] mx-auto rounded-lg">
					<div className="bg-yellow-600 w-full md:w-[55.5rem] p-7 md:p-12 rounded-t">
						<h1 className="text-center text-xl md:text-3xl text-white font-semibold mb-2">
							ART Obra e Serviço
						</h1>
					</div>
					<div className="w-full bg-gray-300">
						<form
							onSubmit={handleSubmit(handleSubmitForm)}
							className="w-full rounded-xl p-6 md:p-10 bg-blue-800"
						>
							<div className="flex flex-col gap-3 w-full">
								<div>
									<label htmlFor="name">
										<input
											type="text"
											id="name"
											// {...register("name", { required: true })}
											className={`${
												errors.name?.type === "required"
													? "border-red-500"
													: "border-blue-400"
											} px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
											placeholder="Seu Nome"
										/>
										{/* {errors.name?.type === "required" && (
									<p role="alert" className="text-red-500 text-center mt-1">
										Nome is required
									</p>
								)} */}
									</label>
								</div>
							</div>
							<ButtonSubmit title="Enviar" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(ObraServico);
