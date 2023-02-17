import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import crealogoImg from "@/assets/crealogo.png";
import CreaPe from "@/components/CreaPe";
import LoadingScreen from "@/components/Loading";
import { cpfMask } from "@/lib/masks";
import { RegisterUser } from "@/lib/register";
import Router from "next/router";
import { ArrowLeft, Eye, EyeSlash } from "phosphor-react";

type Inputs = {
	name: string;
	cpf: string;
	email: string;
	password: string;
	confirmpassword: string;
};

function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState(false);
	const [captcha, setCaptcha] = useState(false);
	const [loading, setLoading] = useState(false);

	function onChange(value: any) {
		setCaptcha(true);
	}

	const handleRegister = async (data: Inputs) => {
		const { name, cpf, email, password, confirmpassword } = data;
		const cpfClean = cpf.replace(/\D/g, "");

		const dataForm = {
			name,
			cpf: cpfClean,
			email,
			password,
		};

		if (captcha) {
			if (password !== confirmpassword) {
				toast.warning(`Senhas não coincidem`, {
					position: "top-right",
					autoClose: false,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			} else {
				const { user, message } = await RegisterUser(dataForm);
				if (user.id) {
					toast.success(`Usuário ${user.name} cadastrado com sucesso`, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});

					Router.push("/login");
				}

				if (message) {
					toast.warning("Usuário já cadastrado", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
						style: {
							width: "100%",
						},
					});
				}
			}
		} else {
			toast.warning("É necessário preencher o captcha corretamente.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	return (
		<>
			<Head>
				<title>Cadastro | CREA</title>
			</Head>
			<div className="relative w-full min-h-screen">
				<div className="md:max-w-[62.5rem] md:h-screen mx-auto p-8">
					<div className="w-full h-full grid items-center pt-7 pb-12">
						<div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
							<section>
								<div className="w-full">
									<div className="flex flex-col items-center">
										<p className="text-xl font-bold">Junte-se ao</p>
										<Image
											src={crealogoImg}
											width={0}
											height={0}
											alt={"Crea Logo"}
											className="w-44"
										/>
										<CreaPe
											color=""
											paragraph="font-semibold"
											title="font-bold"
										/>
									</div>
								</div>
								<div>
									<Link
										href="/login"
										className="flex items-center gap-2 justify-center mt-8 hover:text-blue-600 text-blue-800 font-medium"
									>
										<ArrowLeft size={24} weight="bold" />
										Voltar para login
									</Link>
								</div>
							</section>
							<section>
								<form
									onSubmit={handleSubmit(handleRegister)}
									className="w-full rounded-xl p-6 md:p-10 bg-blue-800"
								>
									<h1 className="text-2xl font-medium mb-8 text-white text-center">
										Crie sua conta
									</h1>
									<div className="flex flex-col gap-3 w-full">
										<div>
											<label htmlFor="name">
												<input
													type="text"
													id="name"
													{...register("name", { required: true })}
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
										<div>
											<label htmlFor="email">
												<input
													type="email"
													id="email"
													{...register("email", { required: true })}
													className={`${
														errors.email?.type === "required"
															? "border-red-500"
															: "border-blue-400"
													} px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
													placeholder="Seu E-mail"
												/>
												{/* {errors.name?.type === "required" && (
												<p role="alert" className="text-red-500 text-center mt-1">
													Nome is required
												</p>
											)} */}
											</label>
										</div>
										<div>
											<label htmlFor="cpf">
												<input
													type="text"
													id="cpf"
													{...register("cpf", {
														required: true,
													})}
													onChange={(e) => {
														const { value } = e.target;
														e.target.value = cpfMask(value);
													}}
													className={`${
														errors.cpf?.type === "required"
															? "border-red-500"
															: "border-blue-400"
													} px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
													placeholder="Seu CPF"
												/>
												{/* {errors.cpf?.type === "required" && (
												<p role="alert" className="text-red-500 text-center mt-1">
													Nome is required
												</p>
											)} */}
											</label>
										</div>
										<div className="relative">
											<label htmlFor="password" className="relative">
												<input
													type={showPassword ? "text" : "password"}
													id="password"
													{...register("password", { required: true })}
													className={`${
														errors.password?.type === "required"
															? "border-red-500"
															: "border-blue-400"
													} px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
													placeholder="Sua Senha"
												/>
												<button
													type="button"
													className="absolute right-4 -top-0.5"
													onClick={(e) => {
														e.preventDefault();
														setShowPassword(!showPassword);
													}}
												>
													{showPassword && (
														<EyeSlash size={24} color="#7cb1ff" />
													)}
													{!showPassword && <Eye size={24} color="#7cb1ff" />}
												</button>
											</label>
										</div>
										<div className="relative">
											<label htmlFor="confirmpassword" className="relative">
												<input
													type={confirmPassword ? "text" : "password"}
													id="confirmpassword"
													{...register("confirmpassword", {
														required: true,
														shouldUnregister: true,
													})}
													className={`${
														errors.confirmpassword?.type === "required"
															? "border-red-500"
															: "border-blue-400"
													} px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
													placeholder="Confirme sua senha"
												/>
												<button
													type="button"
													className="absolute right-4 -top-0.5"
													onClick={(e) => {
														e.preventDefault();
														setConfirmPassword(!confirmPassword);
													}}
												>
													{confirmPassword && (
														<EyeSlash size={24} color="#7cb1ff" />
													)}
													{!confirmPassword && (
														<Eye size={24} color="#7cb1ff" />
													)}
												</button>
											</label>
										</div>
									</div>
									<div className="hidden md:flex justify-center my-3">
										<ReCAPTCHA
											sitekey="6LcYJX8kAAAAAPVJbmC9AkOjZGhU9ZNY5cYV2hqt"
											onChange={onChange}
										/>
									</div>
									<div className="md:hidden flex justify-center my-3">
										<ReCAPTCHA
											sitekey="6LfOnIIkAAAAAIZhuPik-6i25c3-vb4HKvsKUyeG"
											onChange={onChange}
											size="invisible"
											badge="bottomleft"
										/>
									</div>

									<button
										type="submit"
										className="px-3 py-2 md:py-3 mt-4 rounded-lg w-full bg-blue-600 text-white"
									>
										Cadastrar
									</button>
								</form>
							</section>
						</div>
					</div>
				</div>
				{loading && <LoadingScreen />}
			</div>
		</>
	);
}

export default memo(Register);
