import Image from "next/image";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { CreaPe } from "@/components/CreaPe";

import crealogoImg from "@/assets/crealogo.png";
import govlogoImg from "@/assets/govlogo.png";
import Head from "next/head";

type Inputs = {
	login: string;
	password: string;
};

type Error = {
	status: number;
	message: string;
};

export default function Home() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const [showPassword, setShowPassword] = useState(false);
	const [showError, setShowError] = useState<Error>();

	const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
		fetch("http://187.87.138.222:3333/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status) {
					setShowError(data);
				} else {
					localStorage.setItem("accessToken", data.token);
				}
			});
	};

	return (
		<>
			<Head>
				<title>Login - CREA APP</title>
			</Head>
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
				<form
					onSubmit={handleSubmit(onSubmit)}
					action="/api/hello"
					method="post"
					className="w-full md:w-96 px-6"
				>
					<div className="flex flex-col gap-3 w-full">
						<div>
							<label htmlFor="login">
								<input
									type="text"
									id="login"
									{...register("login", { required: true })}
									className={`${
										errors.login?.type === "required"
											? "border-red-500"
											: "border-blue-400"
									} px-3 py-2 md:py-3 border rounded-lg w-full`}
									placeholder="Email Address"
								/>
								{/* {errors.login?.type === "required" && (
									<p role="alert" className="text-red-500 text-center mt-1">
										Login is required
									</p>
								)} */}
							</label>
						</div>
						<div className="relative">
							<label htmlFor="password">
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									{...register("password", { required: true })}
									className={`${
										errors.password?.type === "required"
											? "border-red-500"
											: "border-blue-400"
									} px-3 py-2 md:py-3 border rounded-lg w-full`}
									placeholder="Password"
								/>
								{/* {errors.password?.type === "required" && (
									<p role="alert" className="text-red-500 text-center mt-1">
										Password is required
									</p>
								)} */}
								<button
									className="absolute top-2.5 right-4"
									onClick={(e) => {
										e.preventDefault();
										setShowPassword(!showPassword);
									}}
								>
									{showPassword ? (
										<EyeSlash size={24} color="#7cb1ff" />
									) : (
										<Eye size={24} color="#7cb1ff" />
									)}
								</button>
							</label>
						</div>
						{showError?.message && (
							<p role="alert" className="text-red-500 text-center mt-1">
								{showError.message}
							</p>
						)}
						{!showError?.message && (
							<p role="alert" className="text-red-500 text-center mt-1"></p>
						)}
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
				</form>
				<div>
					<p className="text-center text-gray-500">
						Crie uma{" "}
						<a href="#" className="text-blue-700 font-semibold">
							conta
						</a>
					</p>
					<p className="text-center text-gray-500">
						Esqueceu a senha?{" "}
						<a href="#" className="text-blue-700 font-semibold">
							Redefinir
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
