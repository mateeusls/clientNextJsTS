"use client";
import { Address } from "@/components/Address";
import { Input } from "@/components/Form/Input";
import { Radio } from "@/components/Form/Radio";
import { Select } from "@/components/Form/Select";
import { Textarea } from "@/components/Form/TextArea";
import { TitleList } from "@/components/TitleList";
import { Form } from "@unform/web";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import * as Yup from "yup";

import warningImg from "@/assets/warning.svg";
import ButtonSubmit from "@/components/ButtonSubmit";
import { Checkbox } from "@/components/Form/Checkbox";
import InputMask from "@/components/Form/InputMask";
import Sidebar from "@/components/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { FormHandles, SubmitHandler } from "@unform/core";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type Inputs = {
	tipomodelo: string;
	numeroart: string;
	dtregistroart: Date;
	artsubstituicao: string;
	artcomplementar: string;
	formaregistro: string;
	participacao: string;
	motivoartepoca: string;
	nomeprofissiona: string;
	rnp: string;
	cpfresptecnico: string;
	telefonetecnico: string;
	emailresponsave: string;
	cepresponsavel: string;
	auxlogradourtec: string;
	enderecorespons: string;
	numenderecoresp: string;
	complementoresp: string;
	bairroresponsav: string;
	municipiorespon: string;
	ufresponsavel: string;
	paisresponsavel: string;
	denominacontrat: string;
	cnpjcontratante: string;
	razaosocialcont: string;
	registronocrea: string;
	cep: string;
	auxlogradcontra: string;
	enderecocontrat: string;
	numenderecontra: string;
	complementocont: string;
	bairrocontratan: string;
	municipiocontra: string;
	ufcontratante: string;
	paiscontratante: string;
	rbtipocoordenad: string;
	vinculocontratu: string;
	auxdescentraliz: string;
	auxcentralizada: string;
	cepunidadeadm: string;
	auxlograundadm: string;
	enderecounidadm: string;
	numenderecoadm: string;
	complementounid: string;
	bairrounidadadm: string;
	municipiounidad: string;
	ufunidadeadm: string;
	paisunidadeadm: string;
	iniciovinculoco: Date;
	terminovinculo: Date;
	auxtipovinculo: string;
	auxdesignacao: string;
	atividadeprofis: string;
	atividadecontra: string;
	quantidadatvtec: string;
	auxunidade: string;
	observacoes: string;
	// anexocargahorar: File;
	acaoinstitucion: string;
	auxentidadeclas: string;
	observacaoespec: string;
	declaraacessibi: string;
	cbdeclararegras: string;
	declaracaotermo: string;
	latitude: string;
	longitude: string;
	rbcontratante: string;
};

export default function CargoFuncao() {
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const formRef = useRef<FormHandles>(null);
	const [isSubmit, setIsSubmit] = useState(false);
	const handleSubmit: SubmitHandler<Inputs> = async (
		data: Inputs,
		{ reset }
	) => {
		try {
			// Remove all previous errors
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				tipomodelo: Yup.string(),
				numeroart: Yup.string(),
				dtregistroart: Yup.date()
					.typeError("Data inválida")
					.nullable()
					.transform((curr, orig) => (orig === "" ? null : curr)),
				artsubstituicao: Yup.string(),
				artcomplementar: Yup.string(),
				formaregistro: Yup.string(),
				participacao: Yup.string(),
				motivoartepoca: Yup.string(),
				nomeprofissiona: Yup.string(),
				rnp: Yup.string(),
				cpfresptecnico: Yup.string(),
				telefonetecnico: Yup.string(),
				emailresponsave: Yup.string(),
				cepresponsavel: Yup.string(),
				auxlogradourtec: Yup.string(),
				enderecorespons: Yup.string(),
				numenderecoresp: Yup.string(),
				complementoresp: Yup.string(),
				bairroresponsav: Yup.string(),
				municipiorespon: Yup.string(),
				ufresponsavel: Yup.string(),
				paisresponsavel: Yup.string(),
				denominacontrat: Yup.string(),
				cnpjcontratante: Yup.string(),
				razaosocialcont: Yup.string(),
				registronocrea: Yup.string(),
				cep: Yup.string(),
				auxlogradcontra: Yup.string(),
				enderecocontrat: Yup.string(),
				numenderecontra: Yup.string(),
				complementocont: Yup.string(),
				bairrocontratan: Yup.string(),
				municipiocontra: Yup.string(),
				ufcontratante: Yup.string(),
				paiscontratante: Yup.string(),
				rbtipocoordenad: Yup.string(),
				vinculocontratu: Yup.string(),
				auxdescentraliz: Yup.string(),
				auxcentralizada: Yup.string(),
				cepunidadeadm: Yup.string(),
				auxlograundadm: Yup.string(),
				enderecounidadm: Yup.string(),
				numenderecoadm: Yup.string(),
				complementounid: Yup.string(),
				bairrounidadadm: Yup.string(),
				municipiounidad: Yup.string(),
				ufunidadeadm: Yup.string(),
				paisunidadeadm: Yup.string(),
				iniciovinculoco: Yup.date()
					.typeError("Data inválida")
					.nullable()
					.transform((curr, orig) => (orig === "" ? null : curr)),
				terminovinculo: Yup.date()
					.typeError("Data inválida")
					.nullable()
					.transform((curr, orig) => (orig === "" ? null : curr)),

				auxtipovinculo: Yup.string(),
				auxdesignacao: Yup.string(),
				atividadeprofis: Yup.string(),
				atividadecontra: Yup.string(),
				quantidadatvtec: Yup.string(),
				auxunidade: Yup.string(),
				observacoes: Yup.string(),
				// anexocargahorar: Yup.mixed().required("Anexo obrigatório"),
				acaoinstitucion: Yup.string(),
				auxentidadeclas: Yup.string(),
				observacaoespec: Yup.string(),
				declaraacessibi: Yup.string(),
				cbdeclararegras: Yup.string(),
				declaracaotermo: Yup.string(),
				latitude: Yup.string(),
				longitude: Yup.string(),
				rbcontratante: Yup.string(),
			});

			await schema.validate(data, {
				// Validation all fields and return all errors
				abortEarly: false,
			});

			// Validation passed,
			console.log(data);
			axios
				.post<AxiosResponse | any>(
					"https://creapp.herokuapp.com/sesuite/cargo_funcao",
					data
				)
				.then((response) => {
					const { instance, activity } = response.data;
					console.log(response.data);

					if (instance.Status === "FAILURE") {
						toast.error(instance.Detail);
					}

					// if (activity.Status === "FAILURE") {
					// 	toast.error(activity.Detail);
					// }

					if (response.status === 200) {
						toast.success("Cadastro realizado com sucesso!");
						setIsSubmit(true);

						router.push("/services/art");
					}
				});
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				formRef.current?.setErrors(validationErrors);
			}
		}
	};

	const modelOptions = [
		{
			id: "Cargo ou Função",
			value: "1",
			label: "Cargo ou Função",
		},
		{
			id: "Cargo ou Função Fora de Época",
			value: "2",
			label: "Cargo ou Função Fora de Época",
		},
	];

	const coordenadaOptions = [
		{
			id: "rbtipocoordenad1",
			value: "1",
			label: "Grau decimal",
		},
		{ id: "rbtipocoordenad2", value: "2", label: "Grau Minuto e Segundo" },
	];

	const contratanteOptions = [
		{
			id: "rbcontratante1",
			value: "1",
			label: "Pessoa Jurídica de Direito Privado",
		},
		{
			id: "rbcontratante2",
			value: "2",
			label: "Pessoa Jurídica de Direito Público",
		},
	];

	const declaracaoAcessibilidadeOptions = [
		{
			id: "declaraacessibi1",
			value: "1",
			label:
				"Sim: “Declaro atendimento às regras de acessibilidade previstas nas normas técnicas da ABNT, na legislação específica Decreto nº 5.296, de 2 de dezembro de 2004, não se aplicam às atividades profissionais acima relacionadas.”",
		},
		{
			id: "declaraacessibi2",
			value: "2",
			label:
				"Não: “Declaro que as regras de acessibilidade previstas nas normas técnicas da ABNT, na legislação específica e no Decreto nº 5.296, de 2 de dezembro de 2004.”",
		},
	];

	const vinculocontratualOptions = [
		{
			id: "vinculocontratu1",
			value: "1",
			label: "Descentralizada",
		},
		{ id: "vinculocontratu2", value: "2", label: "Centralizada" },
	];

	const atividadeProfissionalOptions = [
		{ value: "", label: "SELECIONE" },
		{
			value: "DESEMPENHO DE CARGO TÉCNICO",
			label: "DESEMPENHO DE CARGO TÉCNICO",
		},
		{
			value: "DESEMPENHO DE FUNÇÃO TÉCNICA",
			label: "DESEMPENHO DE FUNÇÃO TÉCNICA",
		},
	];

	const formaRegistroOptions = [
		{ label: "SELECIONE", value: "" },
		{ label: "INICIAL", value: "INICIAL" },
		{ label: "COMPLEMENTAR", value: "COMPLEMENTAR" },
		{ label: "SUBSTITUIÇÃO", value: "SUBSTITUIÇÃO" },
	];

	const participacaoOptions = [
		{ value: "", label: "SELECIONE" },
		{ value: "CO-AUTOR", label: "CO-AUTOR" },
		{ value: "CO-RESPONSÁVEL", label: "CO-RESPONSÁVEL" },
		{ value: "EQUIPE", label: "EQUIPE" },
		{ value: "INDIVIDUAL", label: "INDIVIDUAL" },
	];

	return (
		<>
			<Head>
				<title>Cargo ou Função | ART | CREA</title>
			</Head>
			<Sidebar />
			<main className="w-full ">
				<div className="py-4 px-2">
					<div className="flex flex-col items-center lg:w-[55.5rem] mx-auto rounded-lg">
						<div className="bg-yellow-600 w-full p-7 md:py-7 rounded-t">
							<h1 className="text-center text-xl md:text-3xl text-white font-semibold mb-2">
								ART Cargo ou Função
							</h1>
						</div>
						<div className="w-full flex justify-center bg-blue-800 py-6">
							<Form
								ref={formRef}
								className="w-full px-6"
								onSubmit={handleSubmit}
							>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-sm font-medium leading-6 text-white dark:text-white">
										Selecione o Modelo
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
										<Radio
											options={modelOptions}
											name="tipomodelo"
											className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
										/>
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Dados da ART
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
										<Input
											name="numeroart"
											label="Número da ART"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Input
											name="dtregistroart"
											type="date"
											defaultValue={new Date().toISOString().substr(0, 10)}
											label="Data de Registro da ART"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
								</fieldset>
								<Select name="formaregistro" label="Forma de Registro">
									{formaRegistroOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
								<fieldset className="border p-4 rounded w-full my-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										ART de Substituição
									</legend>
									<div>
										<Input
											name="artsubstituicao"
											label="Número da ART de Substituição"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Textarea
											name="motivosubstitui"
											label="Motivo da Substituição"
										/>
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										ART Complementar
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
										<Input
											name="artcomplementar"
											label="Número da ART"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Select name="participacao" label="Participação">
											{participacaoOptions.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</Select>
									</div>
									<div>
										<Textarea name="motivoartepoca" label="Observação" />
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Responsável Técnico
									</legend>
									<div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-2">
										<Input
											value={user?.name}
											name="nomeprofissiona"
											label="Nome Responsável Técnico"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Input
											value={user?.rnp}
											name="rnp"
											label="RNP"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<InputMask
											value={user?.cpf}
											name="cpfresptecnico"
											label="CPF do Responsável Técnico"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											mask="999.999.999-99"
										/>
									</div>
									<TitleList />
									<div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-2">
										<Input
											name="telefonetecnico"
											label="Telefone"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Input
											value={user?.email}
											name="emailresponsave"
											label="E-mail do Responsável Técnico"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
									<Address
										title="Endereço do Responsável Técnico"
										cep="cepresponsavel"
										tipoLogradouro="auxlogradourtec"
										logradouro="enderecorespons"
										numero="numenderecoresp"
										complemento="complementoresp"
										bairro="bairroresponsav"
										cidade="municipiorespon"
										uf="ufresponsavel"
										pais="paisresponsavel"
										isSubmit={isSubmit}
										setIsSubmit={setIsSubmit}
									/>
								</fieldset>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Contratante
									</legend>
									<fieldset className="border p-4 rounded w-full mb-4">
										<legend className="text-lg font-medium leading-6 text-white dark:text-white">
											Denominação da Contratante
										</legend>
										<Input
											name="denominacontrat"
											label="Razão Social"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</fieldset>
									<div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-2">
										<Input
											name="cnpjcontratante"
											label="CNPJ da Contratante"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Input
											name="registronocrea"
											label="Registro no CREA"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
									<Address
										title="Endereço da Contratante"
										cep="cep"
										tipoLogradouro="auxlogradcontra"
										logradouro="enderecocontrat"
										numero="numenderecontra"
										complemento="complementocont"
										bairro="bairrocontratan"
										cidade="municipiocontra"
										uf="ufcontratante"
										pais="paiscontratante"
										isSubmit={isSubmit}
										setIsSubmit={setIsSubmit}
									/>
									<fieldset className="border p-4 rounded w-full my-2">
										<legend className="text-lg font-medium leading-6 text-white dark:text-white">
											Tipo de Coordenada
										</legend>
										<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 border p-4 rounded w-full mb-4">
											<Radio
												options={coordenadaOptions}
												name="rbtipocoordenad"
												className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
											<Input
												name="latitude"
												label="Latitude"
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
											<Input
												name="longitude"
												label="Longitude"
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</div>
									</fieldset>
								</fieldset>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Tipo de Contratante
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 mb-2 ">
										<Radio
											options={contratanteOptions}
											name="rbcontratante"
											className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
										/>
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Vínculo Contratual
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 border p-4 rounded w-full mb-4">
										<Radio
											options={vinculocontratualOptions}
											name="vinculocontratu"
											className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-2 mb-2">
										<Input
											name="auxdescentraliz"
											label="Descentralizada"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										{/* <Input
											name="outros"
											label="Outros"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/> */}
										<Input
											name="auxcentralizada"
											label="Centralizada"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
									<Address
										title="Endereço da Unidade Administrativa"
										cep="cepunidadeadm"
										tipoLogradouro="auxlograundadm"
										logradouro="enderecounidadm"
										numero="numenderecoadm"
										complemento="complementounid"
										bairro="bairrounidadadm"
										cidade="municipiounidad"
										isSubmit={isSubmit}
										setIsSubmit={setIsSubmit}
									/>
									<div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-2 mb-2">
										<Input
											type="date"
											name="iniciovinculoco"
											label="Data de Início"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Input
											type="date"
											name="terminovinculo"
											label="Previsão de Término"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Input
											name="auxtipovinculo"
											label="Tipo de Vínculo"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 mb-2">
										<Input
											name="auxdesignacao"
											label="Designação do Cargo"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										{/* <Input
											name="Mudar"
											label="Cargo ou Função fora da Lista"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/> */}
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Atividade Técnica
									</legend>
									<Select name="atividadeprofis" label="Atividade Profissional">
										{atividadeProfissionalOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 mb-2">
										<Select
											name="auxdesecargotec"
											label="Desempenho de Cargo Técnico"
										>
											{atividadeProfissionalOptions.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</Select>
										<Select
											name="auxdesefuncaote"
											label="Desempenho de Função Técnica"
										>
											{atividadeProfissionalOptions.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</Select>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 mb-2">
										<Input
											name="quantidadatvtec"
											label="Quantidade"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
										<Input
											name="auxunidade"
											label="Unidade"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
									<Textarea name="observacoes" label="Observações" />
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Anexar Documentos
									</legend>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Ação Intitucional (Convênio)
									</legend>
									<Input
										name="acaoinstitucion"
										label=""
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Entidade de Classe
									</legend>
									<Input
										name="auxentidadeclas"
										label=""
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Informações
									</legend>
									<fieldset className="border p-4 rounded w-full my-2">
										<legend className="text-lg font-medium leading-6 text-white dark:text-white">
											Observações Gerais
										</legend>
										<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 mb-2">
											<section className="col-span-2 w-full">
												<ol className="grid gap-2 text-[12px] text-white list-decimal list-inside w-full">
													<li className="leading-normal">
														A ART é válida somente quando quitada, mediante
														apresentação do comprovante do pagamento ou
														conferência no site do Crea.
													</li>
													<li className="leading-normal">
														A autenticidade deste documento pode ser verificada
														no www.crea-xx.org.br ou www.confea.org.br.
													</li>
													<li className="leading-normal">
														A guarda da via assinada da ART será de
														responsabilidade do profissional e do contratante,
														com o objetivo de documentar o vínculo contratual.
													</li>
												</ol>
											</section>
										</div>
									</fieldset>
									<fieldset className="border p-4 rounded w-full my-2">
										<legend className="text-lg font-medium leading-6 text-white dark:text-white">
											Atenção
										</legend>
										<div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-2 mb-2">
											<section className="h-full mx-auto">
												<Image
													src={warningImg}
													width={100}
													height={100}
													alt=""
												/>
											</section>
											<section className="col-span-2 w-full">
												<ol className="grid gap-2 text-[12px] text-white list-decimal list-inside">
													<li className="leading-normal">
														ESTA ART PODERÁ SER AVALIADA POSTERIORMENTE À SUA
														LIBERAÇÃO. CASO SE VERIFIQUE INCOMPATIBILIDADE ENTRE
														AS ATIVIDADES DESENVOLVIDAS E AS ATRIBUIÇÕES
														PROFISSIONAIS, A ART SERÁ ENCAMINHADA A CÂMARA
														ESPECIALIZADA DA MODALIDADE PROFISSIONAL
														CORRESPONDENTE PARA POSICIONAMENTO QUANTO A SUA
														VALIDADE.
													</li>
													<li className="leading-normal">
														COMPETE AO CREA, SEMPRE QUE NECESSÁRIO, AVERIGUAR AS
														INFORMAÇÕES APRESENTADAS E ADOTAR AS PROVIDÊNCIAS
														NECESSÁRIAS AO CASO, CONFORME ARTIGO 71 DA RESOLUÇÃO
														Nº 1.025/2009, DO CONFEA;
													</li>
													<li className="leading-normal">
														ESTA ART PODERÁ SER ANULADA, COM BASE NOS INCISOS I
														A VI DO ARTIGO 25 DA RESOLUÇÃO Nº 1.025/2009, DO
														CONFEA: ({" "}
														<Link
															href={
																"https://normativos.confea.org.br/Ementas/Visualizar?id=43481"
															}
														/>{" "}
														).
													</li>
													<li className="leading-normal">
														ERROS NO PREENCHIMENTO PODERÃO PROVOCAR A
														NECESSIDADE DE SUBSTITUIÇÃO DE ARTS PARA CORREÇÃO DE
														INFORMAÇÕES.
													</li>
													<li className="leading-normal">
														AS ARTS DE SUBSTITUIÇÃO BEM COMO AS ARTS NULAS PODEM
														ENSEJAR A NECESSIDADE DE NOVAS ARTS COM NOVOS
														CUSTOS, DE ACORDO COM O DISPOSTO NA RESOLUÇÃO Nº
														1.025/09, DO CONFEA;
													</li>
													<li>
														ATIVIDADES ANOTADAS QUE NÃO SEJAM DE ATRIBUIÇÃO DO
														PROFISSIONAL CONFIGURA EXERCÍCIO ILEGAL DA
														PROFISSÃO, CONFORME O ARTIGO 6º DA LEI Nº 5.194/66;
													</li>
												</ol>
											</section>
										</div>
									</fieldset>
								</fieldset>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Declarações
									</legend>
									<fieldset className="border p-4 rounded w-full mb-4">
										<legend className="text-lg font-medium leading-6 text-white dark:text-white">
											Acessibilidade
										</legend>
										<div>
											<p className="text-white mb-2">
												Declara a aplicabilidade das regras de acessibilidade
												previstas nas normas técnicas da ABNT, na legislação
												específica e no Decreto nº 5.296, de 2 de dezembro de
												2004, às atividades profissionais acima relacionadas,
												conforme as seguintes opções:
											</p>
											<div className="mt-2">
												<Radio
													options={declaracaoAcessibilidadeOptions}
													name="declaraacessibi"
													className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
												/>
											</div>
										</div>
									</fieldset>
									<div className="my-3">
										<Checkbox
											name="cbdeclararegras"
											value="1"
											label="Declaro que estou cumprindo as regras de acessibilidade previstas nas normas técnicas da ABNT, na legislação específica e no decreto nº 5296/2004"
										/>
									</div>
									<fieldset className="border p-4 rounded w-full mb-4">
										<legend className="text-lg font-medium leading-6 text-white dark:text-white">
											Termo
										</legend>
										<div>
											<p className="text-white mb-2">
												A CONTINUIDADE DA ELABORAÇÃO DESTA ART ESTÁ CONDICIONADA
												À CIÊNCIA E CONCORDÂNCIA DASSEGUINTES OBSERVAÇÕES
												IMPORTANTES SEGUNDO AS LEGISLAÇÕES PERTINENTES,
												DESTACADAS PARAO BENEFÍCIO DAS PESSOAS FÍSICAS E
												JURÍDICAS AFETAS AO SISTEMA CONFEA/CREA:
											</p>
											<ol className="grid gap-2 text-[12px] text-white list-decimal list-inside">
												<li className="leading-normal">
													TODAS AS ATIVIDADES ANOTADAS NESTA ART SÃO COMPATÍVEIS
													COM MINHAS ATRIBUIÇÕES PROFISSIONAIS, SEGUNDO A LEI Nº
													5.194/1966 E DEMAIS NORMATIVOS LEGAIS ESPECÍFICOS DA
													MINHA PROFISSÃO.
												</li>
												<li className="leading-normal">
													O PROFISSIONAL DECLARA PARA OS DEVIDOS FINS QUE AS
													INFORMAÇÕES CONTIDAS NESSA ART SÃO VERDADEIRAS SOB
													PENA DE RESPONSABILIDADE CRIMINAL (ARTIGO 299 DO
													CÓDIGO PENAL BRASILEIRO), ÉTICO-PROFISSIONAL, CÍVEL E
													TRABALHISTA.
												</li>
												<Checkbox
													name="declaracaotermo"
													value="1"
													label="DECLARO QUE TENHO CIÊNCIA DOS TERMOS LEGAIS DESTACADOS ACIMA!"
												/>
											</ol>
										</div>
									</fieldset>
								</fieldset>
								<ButtonSubmit title="Enviar" />
							</Form>
						</div>
					</div>
				</div>
				<footer className="flex flex-col py-2 justify-center items-center text-white bg-blue-800">
					<p>
						Conselho Regional de Engenharia e Agronomia de Pernambuco - Avbenida
						Agamenón Magalhães 2978, Espinheiro, Recife, PE
					</p>
					<p>Sistema de Informações Técnicas e Administrativas do CREA-PE</p>
				</footer>
			</main>
		</>
	);
}
