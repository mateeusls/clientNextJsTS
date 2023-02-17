import ButtonSubmit from "@/components/ButtonSubmit";
import LoadingScreen from "@/components/Loading";
import Sidebar from "@/components/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import Head from "next/head";
import { memo, useContext, useState } from "react";
import { useForm } from "react-hook-form";
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
	cbdeclararegras: boolean;
	declaracaotermo: boolean;
	latitude: string;
	longitude: string;
	rbcontratante: string;
};

function CargoFuncao() {
	const { user } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const [loading, setLoading] = useState(false);

	const handleSubmitForm = async (datas: Inputs, e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const { data } = await axios("http://localhost:3333/forms/cargo_funcao", {
			method: "POST",
			data: datas,
		});

		if (data.instance.Status === "SUCCESS") {
			setLoading(false);
			toast.success(`${data.instance.Detail}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		} else {
			setLoading(false);
			toast.error(`Numero de ART precisa ser informado`, {
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
		<div className="w-full min-h-screen relative">
			<Head>
				<title>Cargo ou Função | ART | CREA</title>
			</Head>
			<Sidebar />
			{loading && <LoadingScreen />}
			<div className="py-6 px-2">
				<div className="flex flex-col items-center lg:w-[65.5rem] mx-auto rounded-lg">
					<div className="bg-yellow-600 w-full md:w-[45.5rem] lg:w-[65.5rem] p-7 md:p-12 rounded-t">
						<h1 className="text-center text-xl md:text-3xl text-white font-semibold mb-2">
							ART Cargo ou Função
						</h1>
					</div>
					<div className="w-full flex justify-center bg-gray-300">
						<form
							onSubmit={handleSubmit(handleSubmitForm)}
							className="w-full md:w-[45.5rem] lg:w-[65.5rem] p-2 md:p-10 bg-blue-800"
						>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Atenção
								</legend>
								<div className="flex flex-col gap-3 mb-4">
									<ol className="grid gap-2 text-[12px] text-white list-decimal list-inside">
										<li className="leading-normal">
											ESTA ART PODERÁ SER AVALIADA POSTERIORMENTE À SUA
											LIBERAÇÃO. CASO SE VERIFIQUE INCOMPATIBILIDADE ENTRE AS
											ATIVIDADES DESENVOLVIDAS E AS ATRIBUIÇÕES PROFISSIONAIS, A
											ART SERÁ ENCAMINHADA A CÂMARA ESPECIALIZADA DA MODALIDADE
											PROFISSIONAL CORRESPONDENTE PARA POSICIONAMENTO QUANTO A
											SUA VALIDADE.
										</li>
										<li className="leading-normal">
											COMPETE AO CREA, SEMPRE QUE NECESSÁRIO, AVERIGUAR AS
											INFORMAÇÕES APRESENTADAS E ADOTAR AS PROVIDÊNCIAS
											NECESSÁRIAS AO CASO, CONFORME ARTIGO 71 DA RESOLUÇÃO Nº
											1.025/2009, DO CONFEA;
										</li>
										<li className="leading-normal">
											ESTA ART PODERÁ SER ANULADA, COM BASE NOS INCISOS I A VI
											DO ARTIGO 25 DA RESOLUÇÃO Nº 1.025/2009, DO CONFEA:
											(https://normativos.confea.org.br/Ementas/Visualizar?id=43481).
										</li>
										<li className="leading-normal">
											ERROS NO PREENCHIMENTO PODERÃO PROVOCAR A NECESSIDADE DE
											SUBSTITUIÇÃO DE ARTS PARA CORREÇÃO DE INFORMAÇÕES.
										</li>
										<li className="leading-normal">
											AS ARTS DE SUBSTITUIÇÃO BEM COMO AS ARTS NULAS PODEM
											ENSEJAR A NECESSIDADE DE NOVAS ARTS COM NOVOS CUSTOS, DE
											ACORDO COM O DISPOSTO NA RESOLUÇÃO Nº 1.025/09, DO CONFEA;
										</li>
										<li>
											ATIVIDADES ANOTADAS QUE NÃO SEJAM DE ATRIBUIÇÃO DO
											PROFISSIONAL CONFIGURA EXERCÍCIO ILEGAL DA PROFISSÃO,
											CONFORME O ARTIGO 6º DA LEI Nº 5.194/66;
										</li>
									</ol>
								</div>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Selecione o Modelo
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
									<label
										htmlFor="tipomodelo"
										className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
									>
										<input
											id=""
											type="radio"
											{...register("tipomodelo", { required: false })}
											className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
											value="1"
										/>
										<span>CARGO OU FUNÇÃO INICIAL</span>
									</label>
									<label
										htmlFor="tipomodelo"
										className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
									>
										<input
											id=""
											type="radio"
											{...register("tipomodelo", { required: false })}
											className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
											value="2"
										/>
										<span>CARGO OU FUNÇÃO FORA DE ÉPOCA</span>
									</label>
								</div>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-lg font-medium leading-6 text-white dark:text-white">
									Dados da ART
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
									<label htmlFor="numeroart">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Número da ART
										</span>
										<input
											type="text"
											id="numeroart"
											{...register("numeroart", { required: false })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<label htmlFor="dtregistroart">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Data de Registro da ART
										</span>
										<input
											type="date"
											id="dtregistroart"
											{...register("dtregistroart", { required: false })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</div>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-lg font-medium leading-6 text-white dark:text-white">
									ART de Substituição
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
									<label htmlFor="artsubstituicao">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Número da ART de Substituição
										</span>
										<input
											type="text"
											id="artsubstituicao"
											{...register("artsubstituicao", { required: false })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</div>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-lg font-medium leading-6 text-white dark:text-white">
									ART Complementar
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
									<label htmlFor="artcomplementar">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Número da ART
										</span>
										<input
											type="text"
											id="artcomplementar"
											{...register("artcomplementar", { required: false })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<label htmlFor="formaregistro">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Forma de Registro
										</span>
										<select
											id="formaregistro"
											{...register("formaregistro", { required: false })}
											className="form-select w-full py-2 px-3 leading-5 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:shadow-outline-blue-300 transition duration-150 ease-in-out"
										>
											<option value="">Selecione</option>
											<option value="INICIAL">Inicial</option>
											<option value="COMPLEMENTAR">Complementar</option>
											<option value="SUBSTITUIÇÃO">Substituição</option>
										</select>
									</label>
									<label htmlFor="participacao">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Participação
										</span>
										<input
											type="text"
											id="participacao"
											{...register("participacao", { required: false })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</div>
								<div>
									<textarea
										id="motivoartepoca"
										{...register("motivoartepoca", { required: false })}
										className="form-input w-full rounded-md p-2 border outline-none border-blue-400 mt-3"
										placeholder="OBSERVAÇÃO"
									></textarea>
								</div>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-lg font-medium leading-6 text-white dark:text-white">
									Responsável Técnico
								</legend>
								<div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-2">
									<label htmlFor="nomeprofissiona">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Nome Responsável Técnico
										</span>
										<input
											type="text"
											id="nomeprofissiona"
											{...register("nomeprofissiona", { required: true })}
											value={user ? user.name : ""}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<label htmlFor="rnp">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											RNP
										</span>
										<input
											type="text"
											id="rnp"
											{...register("rnp", { required: true })}
											value={user ? user.rnp : ""}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<label htmlFor="cpfresptecnico">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											CPF do Responsável Técnico
										</span>
										<input
											type="text"
											id="cpfresptecnico"
											{...register("cpfresptecnico", { required: true })}
											value={user ? user.cpf : ""}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</div>
								<div className="relative overflow-x-auto my-3">
									<h3 className="text-center text-white bg-slate-400 rounded-t">
										Título Profissional
									</h3>
									<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
											<tr>
												<th scope="col" className="px-6 py-3">
													Tipo
												</th>
												<th scope="col" className="px-6 py-3">
													Título
												</th>
												<th scope="col" className="px-6 py-3">
													Ações
												</th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
								</div>
								<div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-2">
									<label htmlFor="telefonetecnico">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Telefone
										</span>
										<input
											type="text"
											id="telefonetecnico"
											{...register("telefonetecnico", { required: true })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<label htmlFor="emailresponsave">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											E-mail do Responsável Técnico
										</span>
										<input
											type="text"
											id="emailresponsave"
											{...register("emailresponsave", { required: true })}
											value={user ? user.email : ""}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</div>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Endereço Responsável Técnico
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 md:gap-2">
										<label htmlFor="cepresponsavel">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												CEP
											</span>
											<input
												type="text"
												id="cepresponsavel"
												{...register("cepresponsavel", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="auxlogradourtec">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Tipo de Logradouro
											</span>
											<select
												id="auxlogradourtec"
												name="auxlogradourtec"
												{...register("auxlogradourtec", { required: true })}
												className="form-select w-full py-2 px-3 leading-5 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:shadow-outline-blue-300 transition duration-150 ease-in-out"
											>
												<option value="">Selecione</option>
												<option value="INICIAL">Inicial</option>
												<option value="COMPLEMENTAR">Complementar</option>
												<option value="SUBSTITUIÇÃO">Substituição</option>
											</select>
										</label>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-2">
										<label htmlFor="enderecorespons">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Endereço
											</span>
											<input
												type="text"
												id="enderecorespons"
												{...register("enderecorespons", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="numenderecoresp">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												N°
											</span>
											<input
												type="text"
												id="numenderecoresp"
												{...register("numenderecoresp", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="complementoresp">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Complemento
											</span>
											<input
												type="text"
												id="complementoresp"
												{...register("complementoresp", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-2">
										<label htmlFor="bairroresponsav">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Bairro
											</span>
											<input
												type="text"
												id="bairroresponsav"
												{...register("bairroresponsav", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="municipiorespon">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Município
											</span>
											<input
												type="text"
												id="municipiorespon"
												{...register("municipiorespon", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="ufresponsavel">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												UF
											</span>
											<input
												type="text"
												id="ufresponsavel"
												{...register("ufresponsavel", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="paisresponsavel">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												País
											</span>
											<input
												type="text"
												id="paisresponsavel"
												{...register("paisresponsavel", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
									</div>
								</fieldset>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-lg font-medium leading-6 text-white dark:text-white">
									Contratante
								</legend>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Denominação da Contratante
									</legend>
									<label htmlFor="denominacontrat">
										<input
											type="text"
											id="denominacontrat"
											{...register("denominacontrat", { required: false })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</fieldset>
								<div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-2">
									<label htmlFor="cnpjcontratante">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											CNPJ
										</span>
										<input
											type="text"
											id="cnpjcontratante"
											{...register("cnpjcontratante", { required: true })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<label htmlFor="razaosocialcont">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Razão Social
										</span>
										<input
											type="text"
											id="razaosocialcont"
											{...register("razaosocialcont", { required: true })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<label htmlFor="registronocrea">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Registro no CREA
										</span>
										<input
											type="text"
											id="registronocrea"
											{...register("registronocrea", { required: true })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</div>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Endereço da Contratante
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 md:gap-2">
										<label htmlFor="cep">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												CEP
											</span>
											<input
												type="text"
												id="cep"
												{...register("cep", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="auxlogradcontra">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Tipo de Logradouro
											</span>
											<select
												id="auxlogradcontra"
												{...register("auxlogradcontra", { required: true })}
												className="form-select w-full py-2 px-3 leading-5 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:shadow-outline-blue-300 transition duration-150 ease-in-out"
											>
												<option value="">Selecione</option>
												<option value="INICIAL">Inicial</option>
												<option value="COMPLEMENTAR">Complementar</option>
												<option value="SUBSTITUIÇÃO">Substituição</option>
											</select>
										</label>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-2">
										<label htmlFor="enderecocontrat">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Endereço
											</span>
											<input
												type="text"
												id="enderecocontrat"
												{...register("enderecocontrat", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="numenderecontra">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												N°
											</span>
											<input
												type="text"
												id="numenderecontra"
												{...register("numenderecontra", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="complementocont">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Complemento
											</span>
											<input
												type="text"
												id="complementocont"
												{...register("complementocont", { required: false })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-2">
										<label htmlFor="bairrocontratan">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Bairro
											</span>
											<input
												type="text"
												id="bairrocontratan"
												{...register("bairrocontratan", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="municipiocontra">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Município
											</span>
											<input
												type="text"
												id="municipiocontra"
												{...register("municipiocontra", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="ufcontratante">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												UF
											</span>
											<input
												type="text"
												id="ufcontratante"
												{...register("ufcontratante", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="paiscontratante">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												País
											</span>
											<input
												type="text"
												id="paiscontratante"
												{...register("paiscontratante", { required: false })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
									</div>
									<fieldset className="border p-4 rounded w-full my-2">
										<legend className="text-lg font-medium leading-6 text-white dark:text-white">
											Tipo de Coordenada
										</legend>
										{/* <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
											<label
												htmlFor="rbtipocoordenad1"
												className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
											>
												<input
													id="rbtipocoordenad1"
													type="radio"
													{...register("rbtipocoordenad", { required: false })}
													className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													value="1"
												/>
												<span>Grau Decimal</span>
											</label>
											<label
												htmlFor="rbtipocoordenad"
												className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
											>
												<input
													id="rbtipocoordenad2"
													type="radio"
													{...register("rbtipocoordenad", { required: false })}
													className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													value="2"
												/>
												<span>Grau Minuto e Segundo</span>
											</label>
										</div> */}
										<div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-2">
											<label htmlFor="latitude">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													Latitude
												</span>
												<input
													type="text"
													id="latitude"
													{...register("latitude", { required: false })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
											<label htmlFor="longitude">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													Longitude
												</span>
												<input
													type="text"
													id="longitude"
													{...register("longitude", { required: false })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
										</div>
									</fieldset>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Tipo de Contratante
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
										<label
											htmlFor="rbcontratante1"
											className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
										>
											<input
												id="rbcontratante1"
												type="radio"
												{...register("rbcontratante", { required: false })}
												className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
												value="1"
											/>
											<span>Pessoa Jurídica de Direito Privado</span>
										</label>
										<label
											htmlFor="rbcontratante2"
											className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
										>
											<input
												id="rbcontratante2"
												type="radio"
												{...register("rbcontratante", { required: false })}
												className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
												value="2"
											/>
											<span>Pessoa Jurídica de Direito Público</span>
										</label>
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Vínculo Contratual
									</legend>
									<fieldset className="border p-4 rounded w-full my-2">
										<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
											<label
												htmlFor=""
												className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
											>
												<input
													id=""
													type="radio"
													{...register("vinculocontratu", { required: false })}
													className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													value="1"
												/>
												<span>Descentralizada</span>
											</label>
											<label
												htmlFor=""
												className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
											>
												<input
													id=""
													type="radio"
													{...register("vinculocontratu", { required: false })}
													className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													value="2"
												/>
												<span>Centralizada</span>
											</label>
										</div>
									</fieldset>
									<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 md:gap-2">
										<label htmlFor="">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Descentralizada
											</span>
											<input
												type="text"
												id=""
												{...register("auxdescentraliz", { required: false })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Centralizada
											</span>
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Centralizada
											</span>
											<input
												type="text"
												id=""
												{...register("auxcentralizada", { required: false })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
									</div>
									<fieldset className="border p-4 rounded w-full my-2">
										<legend className="text-sm font-medium leading-6 text-white dark:text-white">
											Endereço da Unidade Administrativa
										</legend>
										<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 md:gap-2">
											<label htmlFor="cepunidadeadm">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													CEP
												</span>
												<input
													type="text"
													id="cepunidadeadm"
													{...register("cepunidadeadm", { required: true })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
											<label htmlFor="">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													Tipo de Logradouro
												</span>
												<select
													{...register("auxlograundadm", { required: true })}
													className="form-select w-full py-2 px-3 leading-5 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:shadow-outline-blue-300 transition duration-150 ease-in-out"
												>
													<option value="">Selecione</option>
													<option value="INICIAL">Inicial</option>
													<option value="COMPLEMENTAR">Complementar</option>
													<option value="SUBSTITUIÇÃO">Substituição</option>
												</select>
											</label>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-2">
											<label htmlFor="enderecounidadm">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													Endereço
												</span>
												<input
													type="text"
													id="enderecounidadm"
													{...register("enderecounidadm", { required: true })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
											<label htmlFor="numenderecoadm">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													N°
												</span>
												<input
													type="text"
													id="numenderecoadm"
													{...register("numenderecoadm", { required: true })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
											<label htmlFor="complementounid">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													Complemento
												</span>
												<input
													type="text"
													id="complementounid"
													{...register("complementounid", { required: true })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-2">
											<label htmlFor="bairrounidadadm">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													Bairro
												</span>
												<input
													type="text"
													id="bairrounidadadm"
													{...register("bairrounidadadm", { required: true })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
											<label htmlFor="municipiounidad">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													Município
												</span>
												<input
													type="text"
													id="municipiounidad"
													{...register("municipiounidad", { required: true })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
											<label htmlFor="ufunidadeadm">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													UF
												</span>
												<input
													type="text"
													id="ufunidadeadm"
													{...register("ufunidadeadm", { required: true })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
											<label htmlFor="paisunidadeadm">
												<span className="text-sm font-medium leading-5 text-white dark:text-white">
													País
												</span>
												<input
													type="text"
													id="paisunidadeadm"
													{...register("paisunidadeadm", { required: true })}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
												/>
											</label>
										</div>
									</fieldset>
									<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-2">
										<label htmlFor="iniciovinculoco">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Data de início
											</span>
											<input
												type="date"
												id="iniciovinculoco"
												{...register("iniciovinculoco", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="terminovinculo">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Previsão de Término
											</span>
											<input
												type="date"
												id="terminovinculo"
												{...register("terminovinculo", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="auxtipovinculo">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Tipo de Vínculo
											</span>
											<input
												type="text"
												id="auxtipovinculo"
												{...register("auxtipovinculo", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="auxdesignacao">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Designação do Cargo
											</span>
											<input
												type="text"
												id="auxdesignacao"
												{...register("auxdesignacao", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Atividade Técnica
									</legend>
									<label htmlFor="atividadeprofis">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Atividade Profissional
										</span>
										<input
											type="text"
											id="atividadeprofis"
											{...register("atividadeprofis", { required: true })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<label htmlFor="atividadecontra">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Atividade
										</span>
										<input
											type="text"
											id="atividadecontra"
											{...register("atividadecontra", { required: true })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
									<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-2">
										<label htmlFor="quantidadatvtec">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Quantidade
											</span>
											<input
												type="text"
												id="quantidadatvtec"
												{...register("quantidadatvtec", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
										<label htmlFor="auxunidade">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Unidade
											</span>
											<input
												type="text"
												id="auxunidade"
												{...register("auxunidade", { required: true })}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</label>
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Observações
									</legend>
									<div>
										<textarea
											id="observacoes"
											{...register("observacoes", { required: false })}
											className="form-input w-full rounded-md p-2 border outline-none border-blue-400"
											placeholder="Observações"
										></textarea>
									</div>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Anexar Arquivo
									</legend>
									<label htmlFor="">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Arquivo
										</span>
										<input
											type="file"
											id=""
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Ação Institucional (Convênio)
									</legend>
									<label htmlFor="acaoinstitucion">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Ação Institucional
										</span>
										<input
											type="text"
											id="acaoinstitucion"
											{...register("acaoinstitucion", { required: false })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</fieldset>
								<fieldset className="border p-4 rounded w-full my-2">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Entidade de Classe
									</legend>
									<label htmlFor="auxentidadeclas">
										<span className="text-sm font-medium leading-5 text-white dark:text-white">
											Ação Institucional
										</span>
										<input
											type="text"
											id="auxentidadeclas"
											{...register("auxentidadeclas", { required: false })}
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</label>
								</fieldset>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-lg font-medium leading-6 text-white dark:text-white">
									Informações
								</legend>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-lg font-medium leading-6 text-white dark:text-white">
										Observações Gerais
									</legend>
									<div className="flex flex-col gap-3 mb-4">
										<ol className="grid gap-2 text-[12px] text-white list-decimal list-inside">
											<li className="leading-normal">
												A ART é válida somente quando quitada, mediante
												apresentação do comprovante do pagamento ou conferência
												no site do Crea.
											</li>
											<li className="leading-normal">
												A autenticidade deste documento pode ser verificada no
												www.crea-xx.org.br ou www.confea.org.br.
											</li>
											<li className="leading-normal">
												A guarda da via assinada da ART será de responsabilidade
												do profissional e do contratante, com o objetivo de
												documentar o vínculo contratual.
											</li>
										</ol>
									</div>
								</fieldset>
								<div>
									<span className="text-sm font-medium leading-5 text-white dark:text-white">
										Observações Específicas
									</span>
									<textarea
										id="observacaoespec"
										{...register("observacaoespec", { required: false })}
										className="form-input w-full rounded-md p-2 border outline-none border-blue-400"
									></textarea>
								</div>
								<fieldset className="border p-4 rounded w-full mb-4">
									<legend className="text-sm font-medium leading-6 text-white dark:text-white">
										Dados do CREA-PE
									</legend>
									<div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-2">
										<label htmlFor="">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Telefone
											</span>
											<p className="text-white text-sm">(81) 3423-4383</p>
										</label>
										<label htmlFor="">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												E-mail
											</span>
											<p className="text-white text-sm">
												ouvidoria@creape.org.br
											</p>
										</label>
										<label htmlFor="">
											<span className="text-sm font-medium leading-5 text-white dark:text-white">
												Site
											</span>
											<p className="text-white text-sm">
												https://www.creape.org.br/
											</p>
										</label>
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
									<div className="flex flex-col gap-3 mb-4">
										<ol className="grid gap-2 text-[12px] text-white">
											<li className="leading-normal">
												Declara a aplicabilidade das regras de acessibilidade
												previstas nas normas técnicas da ABNT, na legislação
												específica e no Decreto nº 5.296, de 2 de dezembro de
												2004, às atividades profissionais acima relacionadas,
												conforme as seguintes opções:
											</li>
										</ol>
										<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
											<label
												htmlFor="declaraacessibi"
												className="text-sm font-medium leading-5 text-white dark:text-white flex gap-2"
											>
												<input
													id=""
													type="radio"
													{...register("declaraacessibi", { required: true })}
													className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													value="1"
												/>
												<span>
													1. Sim: “Declaro atendimento às regras de
													acessibilidade previstas nas normas técnicas da ABNT,
													na legislação específica e no Decreto nº 5.296, de 2
													de dezembro de 2004.”
												</span>
											</label>
											<label
												htmlFor="declaraacessibi2"
												className="text-sm font-medium leading-5 text-white dark:text-white flex  gap-2"
											>
												<input
													id="declaraacessibi2"
													type="radio"
													{...register("declaraacessibi", { required: true })}
													className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													value="2"
												/>
												<span>
													2. Não: “Declaro que as regras de acessibilidade
													previstas nas normas técnicas da ABNT, na legislação
													específica e no Decreto nº 5.296, de 2 de dezembro de
													2004, não se aplicam às atividades profissionais acima
													relacionadas.”
												</span>
											</label>
										</div>
									</div>
								</fieldset>
								<label
									htmlFor="cbdeclararegras"
									className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
								>
									<input
										id=""
										type="checkbox"
										{...register("cbdeclararegras", { required: true })}
										className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
										value="1"
									/>
									<span>
										Declaro que estou cumprindo as regras de acessibilidade
										previstas nas normas técnicas da ABNT, na legislação
										específica e no decreto nº 5296/2004
									</span>
								</label>
								<fieldset className="border p-4 rounded w-full my-3">
									<legend className="text-sm font-medium leading-6 text-white dark:text-white">
										Termo
									</legend>
									<div className="flex flex-col gap-3 mb-4">
										<p className="text-white">
											A CONTINUIDADE DA ELABORAÇÃO DESTA ART ESTÁ CONDICIONADA À
											CIÊNCIA E CONCORDÂNCIA DASSEGUINTES OBSERVAÇÕES
											IMPORTANTES SEGUNDO AS LEGISLAÇÕES PERTINENTES, DESTACADAS
											PARAO BENEFÍCIO DAS PESSOAS FÍSICAS E JURÍDICAS AFETAS AO
											SISTEMA CONFEA/CREA:
										</p>
										<ol className="grid text-[12px] text-white list-decimal list-inside gap-2">
											<li>
												TODAS AS ATIVIDADES ANOTADAS NESTA ART SÃO COMPATÍVEIS
												COM MINHAS ATRIBUIÇÕES PROFISSIONAIS, SEGUNDO A LEI Nº
												5.194/1966 E DEMAIS NORMATIVOS LEGAIS ESPECÍFICOS DA
												MINHA PROFISSÃO.
											</li>

											<li>
												O PROFISSIONAL DECLARA PARA OS DEVIDOS FINS QUE AS
												INFORMAÇÕES CONTIDAS NESSA ART SÃO VERDADEIRAS SOB PENA
												DE RESPONSABILIDADE CRIMINAL (ARTIGO 299 DO CÓDIGO PENAL
												BRASILEIRO), ÉTICO-PROFISSIONAL, CÍVEL E TRABALHISTA.
											</li>
										</ol>
										<label
											htmlFor="declaracaotermo"
											className="text-sm font-medium leading-5 text-white dark:text-white flex gap-2"
										>
											<input
												id="declaracaotermo"
												type="checkbox"
												name="declaracaotermo"
												{...register("declaracaotermo", { required: true })}
												className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
												value="1"
											/>
											<span>
												DECLARO QUE TENHO CONSCIÊNCIA DOS TERMOS LEGAIS
												DESTACADOS ACIMA!
											</span>
										</label>
									</div>
								</fieldset>
							</fieldset>
							<div>
								<p className="text-center mb-2 text-sm text-white">
									Conselho Regional de Engenharia e Agronomia de Pernambuco -
									Avbenida Agamenón Magalhães 2978, Espinheiro, Recife, PE
								</p>
								<p className="text-center text-sm text-white">
									Sistema de Informações Técnicas e Administrativas do CREA-PE
								</p>
							</div>
							<ButtonSubmit title="Enviar" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(CargoFuncao);
