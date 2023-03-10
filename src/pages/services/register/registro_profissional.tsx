import { Address } from "@/components/Address";
import ButtonSubmit from "@/components/ButtonSubmit";
import { Checkbox } from "@/components/Form/Checkbox";
import File from "@/components/Form/File";
import FileImage from "@/components/Form/FileImage";
import { Input } from "@/components/Form/Input";
import InputMask from "@/components/Form/InputMask";
import { Radio } from "@/components/Form/Radio";
import { Select } from "@/components/Form/Select";
import { Textarea } from "@/components/Form/TextArea";
import LoadingScreen from "@/components/Loading";
import Modal from "@/components/Modal";
import {
	rbdiplomaciaOptions,
	rbDiplomadoOptions,
	rbTituloPrincipal,
	selectOptionsBrasil,
	selectOptionsDoadorOrgaos,
	selectOptionsExterior,
	selectOptionsGenero,
	selectOptionsPais,
	selectOptionsUf,
} from "@/components/OptionsForm/RegistroProfissional";
import Sidebar from "@/components/Sidebar";
import { TitleList } from "@/components/TitleList";
import { AuthContext } from "@/contexts/AuthContext";
import { getBase64, handlePreview } from "@/lib/utils";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Router from "next/router";
import { memo, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface Inputs {
	lstitulos: string;
	fotoprofissiona?: File;
	anxdiplomactf?: File;
	anxcargahoraria?: File;
	anxdiplomadout?: File;
	anxidentidade?: File;
	anxcpf?: File;
	anxtituloeleito?: File;
	anxjusticaeleit?: File;
	anxcompendereco?: File;
	anxservmilitar?: File;
	anxtiposangue?: File;
	anxnispispasep?: File;
	anxassinatura?: File;

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

export type ModalDataProps = {
	id: number;
	abreviatura: string;
	auxcnpj: string;
	auxcurso: string;
	auxdiplomado: string;
	auxinstituicao: string;
	auxtituloprinc: string;
	auxtpcertificac: string;
	auxtpregistro: string;
	auxuf: string;
	cboutros: string;
	cddocumento: string;
	cnpjinstituicao: string;
	contadordoc: string;
	cursoexterior: string;
	cursooutros: string;
	datacolacaograu: Date;
	datadiploma: Date;
	dataentrada: Date;
	dataformacao: Date;
	dtfinaltitprovi: Date;
	estadocnpj: string;
	iddocumento: string;
	idprocesso: string;
	instituicaoext: string;
	municipiocnpj: string;
	nivelcurso: string;
	nomefantasia: string;
	numerocertifica: string;
	observacao: string;
	razaosocial: string;
	rbdiplomado: string;
	rbtituloprincip: string;
	tituloprofissio: string;
};

function RegistroProfissional() {
	const { user } = useContext(AuthContext);
	const [tipeRegister, setTipeRegister] = useState<string | null>(null);
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const formRef = useRef<FormHandles>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [selectedFiles, setSelectedFiles] = useState<object[]>([]);
	const [modalDataList, setModalDataList] = useState<ModalDataProps[]>([]);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const modalData: SubmitHandler<ModalDataProps> = async (
		data: ModalDataProps,
		{ reset }
	) => {
		try {
			if (data) {
				setModalDataList((prevFiles) => [...prevFiles, data]);
			}
			setIsOpenModal(false);
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

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		const input = e.target.name;
		const obj = {
			EntityAttributeID: input,
			FileName: file.name,
			FileContent: (await getBase64(file)).split(",")[1],
		};
		if (file) {
			setSelectedFiles((prevFiles) => [...prevFiles, obj]);
		}
	};

	const handleSubmit: SubmitHandler<Inputs> = async (
		data: Inputs,
		{ reset }
	) => {
		try {
			delete data.fotoprofissiona;
			delete data.anxdiplomactf;
			delete data.anxcargahoraria;
			delete data.anxdiplomadout;
			delete data.anxidentidade;
			delete data.anxcpf;
			delete data.anxtituloeleito;
			delete data.anxjusticaeleit;
			delete data.anxcompendereco;
			delete data.anxservmilitar;
			delete data.anxtiposangue;
			delete data.anxnispispasep;
			delete data.anxassinatura;
			await axios
				.post<AxiosResponse | any>("/api/sesuite/editdata", {
					processid: "mpp01-prc-regprofissional",
					wftitle: data.nomeprofissiona + " - " + data.cpfprofissional,
					entityid: "registroprof",
					attributelist: data,
					filelist: selectedFiles,
				})
				.then(async (response) => {
					if (response.data.Status === "FAILURE") {
						toast.error("Erro ao cadastrar, tente novamente!");
						setIsLoading(false);
						setIsSubmit(false);
					} else if (response.data.Status === "SUCCESS") {
						if (modalDataList.length > 1) {
							const returnData = [];
							for (let i = 0; i < modalDataList.length; i++) {
								await axios
									.post<AxiosResponse | any>("/api/sesuite/childentityrecord", {
										processid: "mpp01-prc-regprofissional",
										wfid: response.data.RecordID,
										mainentityid: "registroprof",
										entityid: "registroprof",
										childrelationshipid: "relgridtitulo",
										attributelist: modalDataList[i],
										filelist: [],
									})
									.then(async (response) => {
										returnData.push(response.data);
									})
									.catch((error) => {
										toast.error("Erro interno, tente novamente em intantes!");
									});
							}
							if (returnData.length === modalDataList.length) {
								toast.success("Cadastro realizado com sucesso!");
								setIsSubmit(false);
								Router.push("/services/register");
							} else {
								toast.error("Erro ao cadastrar, tente novamente!");
								setIsLoading(false);
								setIsSubmit(false);
							}
						} else {
							await axios
								.post<AxiosResponse | any>("/api/sesuite/childentityrecord", {
									processid: "mpp01-prc-regprofissional",
									wfid: response.data.RecordID,
									mainentityid: "registroprof",
									entityid: "registroprof",
									childrelationshipid: "relgridtitulo",
									attributelist: modalDataList[0],
									filelist: [],
								})
								.then(async (response) => {
									if (response.data.Status === "SUCCESS") {
										toast.success("Cadastro realizado com sucesso!");
										setIsSubmit(false);
										Router.push("/services/register");
									} else {
										toast.error("Erro ao cadastrar, tente novamente!");
										setIsLoading(false);
										setIsSubmit(false);
									}
								})
								.catch((error) => {
									toast.error("Erro interno, tente novamente em intantes!");
								});
						}
					}
				})
				.catch((error) => {
					toast.error("Erro interno, tente novamente em intantes!");
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

	return (
		<>
			<Head>
				<title>Registro Profissional | Registros | CREA</title>
			</Head>
			<Sidebar />
			{isLoading && <LoadingScreen />}
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
												handleFileChange(e);
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
												<Select name="auxgenero" label="G??nero">
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
								<Select name="auxorgexpedidor" label="Org??o Expedidor">
									{selectOptionsGenero.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
								<Input
									name="orgaoexpoutros"
									label="Org??o EXP Outros"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Input
									name="dataexpedicao"
									type="date"
									label="Data Expedi????o"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Select name="auxufexpedidor" label="UF Expedidor">
									{selectOptionsUf.map((option) => (
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
										<Checkbox name="cbregistropai" label="N??o Informar" />
									</div>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									<div className="col-span-2">
										<Input
											name="nomemae"
											label="Nome da M??e"
											className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
										/>
									</div>
									<div className="flex justify-center md:mt-4">
										<Checkbox name="cbregistromae" label="N??o Informar" />
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
									<Select name="auxtiposanguine" label="Tipo Sangu??neo">
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
									<Select name="auxdoadororgao" label="Doador de ??rg??o">
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
									T??tulo de Eleitor
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
									<Input
										name="numtituloeleito"
										label="N??mero do T??tulo"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Input
										name="zonaeleitoral"
										label="Zona Eleitoral"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Input
										name="secaoeleitoral"
										label="Se????o Eleitoral"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									<div className="col-span-2">
										<Select name="auxmunicieleito" label="Munic??pio Eleitoral">
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
								title="Endere??o Residencial"
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
								title="Endere??o Comercial"
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
							<div>
								<TitleList titleList={modalDataList} />
								<button
									type="button"
									onClick={() => setIsOpenModal(true)}
									className="px-3 py-2 md:py-3 mt-4 rounded-lg bg-blue-600 text-white"
								>
									Adicionar T??tulo
								</button>
							</div>
							<fieldset className="border p-4 rounded w-full mt-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Anexar Documentos
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<File
										name="anxdiplomactf"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="Diploma, certificado ou declara????o de conclus??o do curso, registrado pelo ??rg??o competente do Sistema de Ensino"
									/>
									<File
										name="anxcargahoraria"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="Hist??rico com indica????o de cargas hor??rias das disciplinas cursadas"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<File
										name="anxidentidade"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="Documento oficial de identidade"
									/>
									<File
										name="anxcpf"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="CPF"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<File
										name="anxtituloeleito"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="T??tulo de eleitor"
									/>
									<File
										name="anxjusticaeleit"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="Prova de quita????o com a Justi??a Eleitoral"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<File
										name="anxcompendereco"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="Comprovante ou declara????o de endere??o"
									/>
									<File
										name="anxservmilitar"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="Prova de quita????o com o Servi??o Militar (reservista)"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<File
										name="anxtiposangue"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="Original ou c??pia autenticada do exame laboratorial de tipagem sangu??nea ou carteira de doador"
									/>
									<File
										name="anxnispispasep"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="NIS (PIS/PASEP)"
									/>
								</div>
								<div className="">
									<File
										name="anxassinatura"
										onChange={(e) => {
											handleFileChange(e);
										}}
										label="Assinatura Digitalizada"
									/>
								</div>
							</fieldset>
							<fieldset className="border p-4 rounded w-full mt-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Confirma????o de Solicita????o
								</legend>
								<div className="grid grid-cols-1 gap-2">
									<Checkbox
										name="cbsolregcrea"
										label="Solicito meu registro no CREA-PE"
									/>
									<Checkbox
										name="cbinfoverdade"
										label="Declaro que as informa????es prestadas neste requerimento s??o verdadeiras, sob pena de aplica????o do Art. 299 do C??digo Penal Brasileiro"
									/>
								</div>
							</fieldset>
							<ButtonSubmit
								title="Cadastrar"
								onClick={() => setIsLoading(true)}
							/>
						</Form>
					</div>
				</div>
			</div>
			{isOpenModal && (
				<Modal
					setIsOpenModal={setIsOpenModal}
					isOpenModal={isOpenModal}
					title={"Adicione seu T??tulo"}
				>
					<Form ref={formRef} className="w-full" onSubmit={modalData}>
						<fieldset className="border p-4 rounded w-full mt-4">
							<legend className="text-sm font-medium leading-6 text-white dark:text-white">
								Dados do T??tulo - Diplomado no Brasil
							</legend>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
								<Select name="auxuf" label="UF">
									{selectOptionsUf.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
								<Select name="auxinstituicao" label="Institui????o">
									{selectOptionsUf.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
								<Select name="auxcurso" label="Curso">
									{selectOptionsUf.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
								<Checkbox value="1" name="cboutros" label="Outros" />
							</div>
						</fieldset>
						<fieldset className="border p-4 rounded w-full mt-4">
							<legend className="text-sm font-medium leading-6 text-white dark:text-white">
								Outras - Institui????o
							</legend>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
								<Input
									name="cnpjinstituicao"
									label="CNPJ da Institui????o"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Input
									name="nomefantasia"
									label="Nome Fantasia"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Input
									name="razaosocial"
									label="Raz??o Social"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<Input
									name="municipiocnpj"
									label="Municipio"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Input
									name="estadocnpj"
									label="Estado"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
							</div>
							<Input
								name="cursooutros"
								label="Curso"
								className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
							/>
						</fieldset>
						<fieldset className="border p-4 rounded w-full mt-4">
							<legend className="text-sm font-medium leading-6 text-white dark:text-white">
								Dados do T??tulo - Diplomado no Exterior
							</legend>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
								<Select name="auxpais" label="Pa??s">
									{selectOptionsPais.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
								<Input
									name="instituicaoext"
									label="Institui????o"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Input
									name="cursoexterior"
									label="Curso"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
							</div>
						</fieldset>
						<fieldset className="border p-4 rounded w-full mt-4">
							<legend className="text-sm font-medium leading-6 text-white dark:text-white">
								Dados do T??tulo
							</legend>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
								<Input
									name="tituloprofissio"
									label="T??tulo Profissional"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Input
									name="abreviatura"
									label="Abreviatura"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
								<Input
									name="nivelcurso"
									label="N??vel do Curso"
									className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
								/>
							</div>
						</fieldset>
						<fieldset className="border p-4 rounded w-full mt-4">
							<legend className="text-sm font-medium leading-6 text-white dark:text-white">
								Dados do Registro
							</legend>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<section className="flex flex-col justify-center gap-4">
									<Input
										name="numerocertifica"
										label="N??mero do Registro do Diploma"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Select name="auxtpcertificac" label="Tipo de Certifica????o">
										{selectOptionsUf.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
								</section>
								<section>
									<fieldset className="border p-4 rounded w-full mt-4">
										<legend className="text-sm font-medium leading-6 text-white dark:text-white">
											Diplomado
										</legend>
										<div className="grid grid-cols-2 items-center gap-2">
											<Radio
												name="rbdiplomado"
												options={rbDiplomadoOptions}
												onChange={(e) => {
													setTipeRegister(e.target.value);
												}}
												className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
											/>
										</div>
									</fieldset>
									<fieldset className="border p-4 rounded w-full mt-4">
										<legend className="text-sm font-medium leading-6 text-white dark:text-white">
											T??tulo Principal
										</legend>
										<div className="grid grid-cols-2 items-center gap-2">
											<Radio
												name="rbtituloprincip"
												options={rbTituloPrincipal}
												onChange={(e) => {
													setTipeRegister(e.target.value);
												}}
												className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2"
											/>
										</div>
									</fieldset>
								</section>
							</div>
							<fieldset className="border p-4 rounded w-full mt-4">
								<legend className="text-sm font-medium leading-6 text-white dark:text-white">
									Datas
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-4 gap-2">
									<Input
										name="dataentrada"
										type="date"
										label="Data de Inicio"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Input
										name="dataformacao"
										type="date"
										label="Data da Forma????o"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Input
										name="datadiploma"
										type="date"
										label="Data do Diploma"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
									<Input
										name="datacolacaograu"
										type="date"
										label="Data da Cola????o de Grau"
										className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
									/>
								</div>
							</fieldset>
							<Textarea name="observacao" label="Observa????o" />
						</fieldset>
						<ButtonSubmit title="Enviar" />
					</Form>
				</Modal>
			)}
			<footer className="flex flex-col text-sm py-2 justify-center items-center text-white bg-blue-800 mt-auto">
				<p className="text-center">
					Conselho Regional de Engenharia e Agronomia de Pernambuco - Avenida
					Agamenon Magalh??es 2978, Espinheiro, Recife, PE
				</p>
				<p className="text-center">
					Sistema de Informa????es T??cnicas e Administrativas do CREA-PE
				</p>
			</footer>
		</>
	);
}

export default memo(RegistroProfissional);
