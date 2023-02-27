import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import CreaPe from "@/components/CreaPe";

import crealogoImg from "@/assets/crealogo.png";
import govlogoImg from "@/assets/govlogo.png";
import { Input } from "@/components/Form/Input";
import InputMask from "@/components/Form/InputMask";
import { AuthContext } from "@/contexts/AuthContext";
import { Form } from "@unform/web";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { parseCookies } from "nookies";

type Inputs = {
	login: string;
	password: string;
};

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const formRef = useRef();
	const { signIn } = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);

	const handleSignIn = async (data: Inputs) => {
		const loginClean = data.login.replace(/\D/g, "");
		data.login = loginClean;
		const { login, password } = data;
		const dataForm = {
			login,
			password,
		};
		await signIn(dataForm);
	};

	return (
		<>
			<Head>
				<title>Login | CREA</title>
			</Head>
			<div className="relative">
				<div className="flex flex-col gap-8 items-center justify-center py-6  min-h-screen ">
					<div className="w-full">
						<div className="flex flex-col items-center">
							<p className="text-xl font-bold">Bem vindo ao</p>
							<Image
								src={crealogoImg}
								width={0}
								height={0}
								alt={"Crea Logo"}
								className="w-44"
							/>
							<CreaPe color="" paragraph="font-semibold" title="font-bold" />
						</div>
					</div>
					<Form
						ref={formRef}
						onSubmit={handleSignIn}
						className="w-full md:w-96 px-6"
					>
						<div className="flex flex-col gap-3 w-full">
							<div>
								<InputMask
									name="login"
									className={`border-blue-400 px-3 py-2 md:py-3 border outline-none rounded-lg w-full`}
									placeholder="Digite seu CPF"
									mask={"999.999.999-99"}
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
						</div>
						<button
							type="submit"
							className="px-3 py-2 md:py-3 mt-4 rounded-lg w-full bg-blue-800 text-white"
						>
							Login
						</button>
						<button className="px-3 py-2 md:py-3 mt-4 rounded-lg w-full bg-white text-sm text-black font-bold flex justify-center items-center gap-2 border border-black">
							Sign in with{" "}
							<Image
								src={govlogoImg}
								width={0}
								height={0}
								alt={"GovBr Logo"}
								className="w-14"
							/>
						</button>
					</Form>
					<div>
						<p className="text-center text-gray-500">
							Crie uma{" "}
							<Link href="/register" className="text-blue-700 font-semibold">
								conta
							</Link>
						</p>
						<p className="text-center text-gray-500">
							Esqueceu a senha?{" "}
							<a href="#" className="text-blue-700 font-semibold">
								Redefinir
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { ["creapp.token"]: token } = parseCookies(ctx);

	if (token) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
