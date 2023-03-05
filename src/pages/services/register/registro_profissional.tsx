import { Address } from "@/components/Address";
import ButtonSubmit from "@/components/ButtonSubmit";
import { Checkbox } from "@/components/Form/Checkbox";
import FileImage from "@/components/Form/FileImage";
import { Input } from "@/components/Form/Input";
import InputMask from "@/components/Form/InputMask";
import { Radio } from "@/components/Form/Radio";
import { Select } from "@/components/Form/Select";
import { Textarea } from "@/components/Form/TextArea";
import {
	rbdiplomaciaOptions,
	selectOptionsBrasil,
	selectOptionsDoadorOrgaos,
	selectOptionsExterior,
	selectOptionsGenero,
	selectOptionsUfExpedicao,
} from "@/components/OptionsForm/RegistroProfissional";
import Sidebar from "@/components/Sidebar";
import { TitleList } from "@/components/TitleList";
import { AuthContext } from "@/contexts/AuthContext";
import { handleFileChange, handlePreview } from "@/lib/utils";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import { memo, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface Inputs {
	lstitulos: string;
	fotoprofissiona?: string;
	auxcidnaturalid: string;
	auxdiplomado: string;
	auxestadcivil: string;
	auxfatorrh: string;
	auxgenero: string;
	auxlogradreside: string;
	auxlograscomerc: string;
	auxmunicieleito: string;
	auxnecesespecia: string;
	auxorgexpedidor: string;
	auxtiposanguine: string;
	auxtpregistro: string;
	auxufeleitoral: string;
	auxufexpedidor: string;
	auxufnaturalid: string;
	bairrocomercial: string;
	bairroresidenc: string;
	cbinfoverdade: string;
	cbmsmendereco: string;
	cbregistromae: string;
	cbregistropai: string;
	cbsolregcrea: string;
	celular: string;
	cepcomercial: string;
	cepresidencial: string;
	cidadecomercial: string;
	cidaderesidenc: string;
	complcomercial: string;
	complresidencia: string;
	cpfprofissional: string;
	craresultanalis: string;
	dataexpedicao: Date;
	datanascimento: Date;
	datasolicitacao: Date;
	email: string;
	homepage: string;
	identidadeprof: string;
	idpapelfunc: string;
	idpfcamara: string;
	idprocesso: string;
	loginapp: string;
	logradourocomer: string;
	logradouroresid: string;
	matuserespecifi: string;
	nispispasep: string;
	nmpfcamara: string;
	nmuserespecific: string;
	nomemae: string;
	nomepai: string;
	nomepapelfunc: string;
	nomeprofissiona: string;
	nomesocial: string;
	numcomercial: string;
	numerornp: string;
	numresidencial: string;
	numtituloeleito: string;
	orgaoexpoutros: string;
	orgaoexpufexp: string;
	outrasnecessid: string;
	outroscontatos: string;
	papelfuncpai: string;
	pfpaicamara: string;
	pntrefcomercial: string;
	pntrefresidenc: string;
	rbdiplomacia: string;
	secaoeleitoral: string;
	telcomercial: string;
	telresidencial: string;
	ufcomercial: string;
	ufresidencial: string;
	zonaeleitoral: string;
}

function RegistroProfissional() {
	const { user } = useContext(AuthContext);
	const [tipeRegister, setTipeRegister] = useState<string | null>(null);
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const formRef = useRef<FormHandles>(null);
	const [file, setFile] = useState<File | null>(null);
	const [base64, setBase64] = useState<string>("");
	const [preview, setPreview] = useState<string | null>(null);

	const handleSubmit: SubmitHandler<Inputs> = async (
		data: Inputs,
		{ reset }
	) => {
		try {
			// Remove all previous errors
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				auxcidnaturalid: Yup.string(),
				auxestadcivil: Yup.string(),
				auxfatorrh: Yup.string(),
				auxgenero: Yup.string(),
				auxlogradreside: Yup.string(),
				auxlograscomerc: Yup.string(),
				auxmunicieleito: Yup.string(),
				auxnecesespecia: Yup.string(),
				auxorgexpedidor: Yup.string(),
				auxtiposanguine: Yup.string(),
				auxtpregistro: Yup.string(),
				auxufeleitoral: Yup.string(),
				auxufexpedidor: Yup.string(),
				auxufnaturalid: Yup.string(),
				bairrocomercial: Yup.string(),
				bairroresidenc: Yup.string(),
				cbinfoverdade: Yup.string(),
				cbmsmendereco: Yup.string(),
				cbregistromae: Yup.string(),
				cbregistropai: Yup.string(),
				cbsolregcrea: Yup.string(),
				celular: Yup.string(),
				cepcomercial: Yup.string(),
				cepresidencial: Yup.string(),
				cidadecomercial: Yup.string(),
				cidaderesidenc: Yup.string(),
				complcomercial: Yup.string(),
				complresidencia: Yup.string(),
				cpfprofissional: Yup.string(),
				dataexpedicao: Yup.date()
					.typeError("Data inválida")
					.nullable()
					.transform((curr, orig) => (orig === "" ? null : curr)),
				datanascimento: Yup.date()
					.typeError("Data inválida")
					.nullable()
					.transform((curr, orig) => (orig === "" ? null : curr)),
				datasolicitacao: Yup.date()
					.typeError("Data inválida")
					.nullable()
					.transform((curr, orig) => (orig === "" ? null : curr)),
				homepage: Yup.string(),
				identidadeprof: Yup.string(),
				logradourocomer: Yup.string(),
				logradouroresid: Yup.string(),
				nispispasep: Yup.string(),
				nomemae: Yup.string(),
				nomepai: Yup.string(),
				nomeprofissiona: Yup.string(),
				nomesocial: Yup.string(),
				numcomercial: Yup.string(),
				numresidencial: Yup.string(),
				numtituloeleito: Yup.string(),
				orgaoexpoutros: Yup.string(),
				outrasnecessid: Yup.string(),
				outroscontatos: Yup.string(),
				pntrefcomercial: Yup.string(),
				pntrefresidenc: Yup.string(),
				rbdiplomacia: Yup.string(),
				secaoeleitoral: Yup.string(),
				telcomercial: Yup.string(),
				telresidencial: Yup.string(),
				ufcomercial: Yup.string(),
				ufresidencial: Yup.string(),
				zonaeleitoral: Yup.string(),
			});

			await schema.validate(data, {
				// Validation all fields and return all errors
				abortEarly: false,
			});

			// Validation passed,

			delete data.fotoprofissiona;
			const foto = base64.split(",")[1];
			const instance = await axios.post<AxiosResponse | any>(
				"/api/sesuite/editdata",
				{
					processid: "mpp01-prc-regprofissional",
					wftitle: data.nomeprofissiona + " - " + data.cpfprofissional,
					entityid: "registroprof",
					attributelist: data,
					filelist: [
						{
							EntityAttributeID: "fotoprofissiona",
							FileName: file.name,
							FileContent: foto,
						},
					],
				}
			);

			console.log(instance.data);

			axios.post<AxiosResponse | any>("/api/sesuite/executeactivity", {
				wfid: instance.data.RecordID,
				activityid: "RP-ATIV-001",
				ActionSequence: "3",
			});

			if (instance.data.Status === "SUCCESS") {
				toast.success(instance.data.Detail);
			}

			// if (activity.Status === "FAILURE") {
			// 	toast.error(activity.Detail);
			// }

			// if (response.status === 200) {
			// 	toast.success("Cadastro realizado com sucesso!");
			// 	setIsSubmit(true);

			// 	// Router.push("/services/register");
			// }
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

	return (
		<>
			<Head>
				<title>Registro Profissional | Registros | CREA</title>
			</Head>
			<Sidebar />
			{base64 && <p>{base64}</p>}
			<div className="py-4 px-2">
				<div className="flex flex-col items-center lg:w-[55.5rem] mx-auto rounded-lg">
					<div className="bg-yellow-600 w-full p-7 md:py-7 rounded-t">
						<h1 className="text-center text-xl md:text-3xl text-white font-semibold mb-2">
							Registro Profissional
						</h1>
					</div>
					<div className="w-full flex justify-center bg-blue-800 py-6">
						<Form ref={formRef} className="w-full px-6" onSubmit={handleSubmit}>
							{/* <Input type="hidden" name="lstitulos[]" /> */}
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Dados Pessoais
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									<section>
										<FileImage
											title="Foto 3x4 - Com fundo branco e roupa escura (File em JPEG ou PNG)"
											name="fotoprofissiona"
											onChange={(e) => {
												handleFileChange(e, setFile, setBase64);
												handlePreview(e, setPreview);
											}}
											preview={preview}
											setPreview={setPreview}
											show={true}
										/>
									</section>
									<section className="col-span-2">
										<fieldset className="border p-4 rounded w-full mb-4">
											<legend className="text-sm font-medium leading-6 text-white dark:text-white">
												Diplomado
											</legend>
											<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
												<Radio
													name="rbdiplomacia"
													options={rbdiplomaciaOptions}
													onChange={(e) => {
														setTipeRegister(e.target.value);
													}}
													className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
												/>
											</div>
										</fieldset>
										<fieldset className="border p-4 rounded w-full mb-4">
											<Select
												name="auxtpregistro"
												label="Tipo de registro"
												disabled={tipeRegister ? false : true}
											>
												{tipeRegister === "1" && (
													<>
														{selectOptionsBrasil.map((option) => (
															<option key={option.value} value={option.value}>
																{option.label}
															</option>
														))}
													</>
												)}
												{tipeRegister === "2" && (
													<>
														{selectOptionsExterior.map((option) => (
															<option key={option.value} value={option.value}>
																{option.label}
															</option>
														))}
													</>
												)}
											</Select>
											<Input
												name="nomeprofissiona"
												label="Nome Completo"
												value={user?.name || ""}
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
											<Input
												name="nomesocial"
												label="Nome Social"
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
											<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
												<InputMask
													name="cpfprofissional"
													label="CPF"
													value={user?.cpf || ""}
													className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
													mask="999.999.999-99"
												/>
												<Select name="auxgenero" label="Gênero">
													{selectOptionsGenero.map((option) => (
														<option key={option.value} value={option.value}>
															{option.label}
														</option>
													))}
												</Select>
											</div>
											<Input
												name="datanascimento"
												type="date"
												label="Data de Nascimento"
												className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
											/>
										</fieldset>
									</section>
								</div>
							</fieldset>
							<div className="grid grid-cols-1 md:grid-cols-5 gap-2">
								<Input
									name="identidadeprof"
									label="Identidade(RG)"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Select name="auxorgexpedidor" label="Orgão Expedidor">
									{selectOptionsGenero.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
								<Input
									name="orgaoexpoutros"
									label="Orgão EXP Outros"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Input
									name="dataexpedicao"
									type="date"
									label="Data Expedição"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Select name="auxufexpedidor" label="UF Expedidor">
									{selectOptionsUfExpedicao.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
							</div>
							<fieldset className="border p-4 rounded w-full mb-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Naturalidade
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									<Select name="auxufnaturalid" label="UF">
										{selectOptionsGenero.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
									<Select
										name="auxcidnaturalid"
										label="Cidade"
										classeName="col-span-2"
									>
										{selectOptionsGenero.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
								</div>
							</fieldset>
							<div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									<div className="col-span-2">
										<Input
											name="nomepai"
											label="Nome do Pai"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
									<div className="flex justify-center md:mt-4">
										<Checkbox name="cbregistropai" label="Não Informar" />
									</div>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									<div className="col-span-2">
										<Input
											name="nomemae"
											label="Nome da Mãe"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
									<div className="flex justify-center md:mt-4">
										<Checkbox name="cbregistromae" label="Não Informar" />
									</div>
								</div>
							</div>
							<div>
								<div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
									<Input
										name="nispispasep"
										label="NIS (PIS/PASEP)"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Select name="auxestadcivil" label="Estado Civil">
										{selectOptionsGenero.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
									<Select name="auxtiposanguine" label="Tipo Sanguíneo">
										{selectOptionsGenero.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
									<Select name="auxfatorrh" label="Fator RH">
										{selectOptionsGenero.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
								</div>
							</div>
							<div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
									<Select name="auxdoadororgao" label="Doador de Órgão">
										{selectOptionsDoadorOrgaos.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
									<Select name="auxnecesespecia" label="Necessidades Especiais">
										{selectOptionsGenero.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
									<Input
										name="outrasnecessid"
										label="Outras Necessidades"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
								</div>
							</div>
							<fieldset className="border p-4 rounded w-full mt-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Título de Eleitor
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
									<Input
										name="numtituloeleito"
										label="Número do Título"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Input
										name="zonaeleitoral"
										label="Zona Eleitoral"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Input
										name="secaoeleitoral"
										label="Seção Eleitoral"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									<div className="col-span-2">
										<Select name="auxmunicieleito" label="Município Eleitoral">
											{selectOptionsGenero.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</Select>
									</div>
									<Select name="auxufeleitoral" label="UF Eleitoral">
										{selectOptionsGenero.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
								</div>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mt-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Contato
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
									<InputMask
										name="celular"
										label="Celular"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										mask="(99) 99999-9999"
									/>
									<InputMask
										name="telresidencial"
										label="Telefone Residencial"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										mask="(99) 9999-9999"
									/>
									<InputMask
										name="telcomercial"
										label="Telefone Comercial"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										mask="(99) 9999-9999"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<Input
										name="email"
										label="E-mail"
										type="email"
										value={user?.email || ""}
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Input
										name="homepage"
										label="Homepage"
										type="url"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
								</div>
								<Textarea name="outroscontatos" label="Outros Contatos" />
							</fieldset>
							<Address
								title="Endereço Residencial"
								cep="cepresidencial"
								tipoLogradouro="auxlogradreside"
								logradouro="logradouroresid"
								numero="numresidencial"
								complemento="complresidencia"
								bairro="bairroresidenc"
								cidade="cidaderesidenc"
								uf="ufresidencial"
								pontoReferencia="pntrefresidenc"
								isSubmit={isSubmit}
								setIsSubmit={setIsSubmit}
							/>
							<Address
								title="Endereço Comercial"
								cep="cepcomercial"
								tipoLogradouro="auxlograscomerc"
								logradouro="logradourocomer"
								numero="numcomercial"
								complemento="complcomercial"
								bairro="bairrocomercial"
								cidade="cidadecomercial"
								uf="ufcomercial"
								pontoReferencia="pntrefcomercial"
								isSubmit={isSubmit}
								setIsSubmit={setIsSubmit}
							/>
							<TitleList />
							<fieldset className="border p-4 rounded w-full mt-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Confirmação de Solicitação
								</legend>
								<div className="grid grid-cols-1 gap-2">
									<Checkbox
										name="cbsolregcrea"
										label="Solicito meu registro no CREA-PE"
									/>
									<Checkbox
										name="cbinfoverdade"
										label="Declaro que as informações prestadas neste requerimento são verdadeiras, sob pena de aplicação do Art. 299 do Código Penal Brasileiro"
									/>
								</div>
							</fieldset>
							<ButtonSubmit title="Cadastrar" />
						</Form>
					</div>
				</div>
			</div>
			<footer className="flex flex-col py-2 justify-center items-center text-white bg-blue-800 mt-auto">
				<p className="text-center">
					Conselho Regional de Engenharia e Agronomia de Pernambuco - Avenida
					Agamenón Magalhães 2978, Espinheiro, Recife, PE
				</p>
				<p className="text-center">
					Sistema de Informações Técnicas e Administrativas do CREA-PE
				</p>
			</footer>
		</>
	);
}

export default memo(RegistroProfissional);
