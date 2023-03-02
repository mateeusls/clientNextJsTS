import Image from "next/image";
import { memo, useRef, useState } from "react";

import crealogoImg from "@/assets/crealogo.png";
import ButtonSubmit from "@/components/ButtonSubmit";
import CreaPe from "@/components/CreaPe";
import { Input } from "@/components/Form/Input";
import InputMask from "@/components/Form/InputMask";
import LoadingScreen from "@/components/Loading";
import { RegisterUser } from "@/lib/register";
import { api } from "@/services/api";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import {
	ArrowLeft as ArrowLeftIcon,
	Eye as EyeIcon,
	EyeOff as EyeOffIcon,
} from "lucide-react";
import Link from "next/link";
import Router from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import * as Yup from "yup";

type RegisterDataProps = {
	name: string;
	email: string;
	cpf: string;
	password: string;
	confirmPassword: string;
};

function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState(false);
	const [nameValue, setNameValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const formRef = useRef<FormHandles>(null);

	function onChange(value: any) {
		console.log("Captcha value:", value);
		setIsVerified(true);
	}

	const checkUser = async (cpf: string) => {
		const cpfClean = cpf.replace(/\D/g, "");
		setIsLoading(true);
		if (cpfClean === "") {
			setNameValue("");
			setEmailValue("");
			setIsLoading(false);
		} else {
			api
				.post(`confea/Profissionais/Listar`, {
					cpf: cpfClean,
				})
				.then((response) => {
					setNameValue(response.data.nme);
					setEmailValue(response.data.eml);
					setIsLoading(false);
				})
				.catch((error) => {
					console.log(error);
					setNameValue("CPF inválido");
					setEmailValue("");
					setIsLoading(false);
				});
		}
	};

	const handleSubmit: SubmitHandler<RegisterDataProps> = async (
		data: RegisterDataProps,
		{ reset }
	) => {
		const { password, confirmPassword } = data;

		try {
			// Remove all previous errors
			const schema = Yup.object().shape({
				name: Yup.string()
					.required("Nome obrigatório")
					.matches(
						/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
						"Digite seu nome completo"
					),
				email: Yup.string()
					.email("Digite um e-mail válido")
					.required("E-mail obrigatório"),
				cpf: Yup.string().required("CPF obrigatório"),
				password: Yup.string()
					.min(6)
					.matches(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
					.matches(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
					.matches(/[0-9]/, "Senha deve conter pelo menos um número")
					.matches(
						/[^a-zA-Z0-9]/,
						"Senha deve conter pelo menos um caractere especial"
					)
					.required("Senha obrigatória"),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref("password"), null], "Senhas não conferem")
					.required("Confirmação de senha obrigatória"),
			});

			await schema.validate(data, {
				// Validation all fields and return all errors
				abortEarly: false,
			});

			// Validation passed,
			const cpfClean = data.cpf.replace(/\D/g, "");
			data.cpf = cpfClean;

			if (isVerified) {
				if (password !== confirmPassword) {
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
					const { user, message } = await RegisterUser(data);
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
						reset({
							name: "",
							email: "",
							cpf: "",
							password: "",
							confirmPassword: "",
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

			formRef.current?.setErrors({});
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			}
		}
	};

	return (
		<>
			<title>Cadastro | CREA</title>
			{isLoading && <LoadingScreen />}
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
											quality={80}
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
										className="flex items-center gap-2 justify-center mt-3 md:mt-8 hover:text-blue-600 text-blue-800 font-medium"
									>
										<ArrowLeftIcon size={24} />
										Voltar para login
									</Link>
								</div>
							</section>
							<section>
								<Form
									ref={formRef}
									className="w-full md:w-96 px-6"
									onSubmit={handleSubmit}
								>
									<div className="mb-3">
										<InputMask
											name="cpf"
											onBlur={(e) => checkUser(e.target.value)}
											className={`border-blue-400 px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
											placeholder="Digite seu CPF"
											mask={"999.999.999-99"}
										/>
									</div>
									<div className="mb-3">
										<Input
											name="name"
											value={nameValue}
											className={`border-blue-400 px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
											placeholder="Digite seu nome completo"
											disabled={nameValue ? true : false}
										/>
									</div>
									<div className="mb-3">
										<Input
											name="email"
											value={emailValue}
											type={"email"}
											className={`border-blue-400 px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
											placeholder="Digite seu e-mail"
										/>
									</div>
									<div className="relative">
										<Input
											name="password"
											type={showPassword ? "text" : "password"}
											className={`border-blue-400 px-3 py-2 md:py-3 border outline-none rounded-lg w-full mb-3`}
											placeholder="Sua senha"
										/>
										<button
											type="button"
											className="absolute right-4 top-2 md:top-3"
											onClick={(e) => {
												e.preventDefault();
												setShowPassword(!showPassword);
											}}
										>
											{showPassword && <EyeOffIcon size={24} color="#7cb1ff" />}
											{!showPassword && <EyeIcon size={24} color="#7cb1ff" />}
										</button>
									</div>
									<div className="relative">
										<Input
											name="confirmPassword"
											type={confirmPassword ? "text" : "password"}
											className={`border-blue-400 px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
											placeholder="Confirme sua senha"
										/>
										<button
											type="button"
											className="absolute right-4 top-2 md:top-3"
											onClick={(e) => {
												e.preventDefault();
												setConfirmPassword(!confirmPassword);
											}}
										>
											{confirmPassword && (
												<EyeOffIcon size={24} color="#7cb1ff" />
											)}
											{!confirmPassword && (
												<EyeIcon size={24} color="#7cb1ff" />
											)}
										</button>
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
									<ButtonSubmit
										title="Cadastrar"
										onClick={() => setIsLoading(!isLoading)}
									/>
								</Form>
							</section>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default memo(Register);
