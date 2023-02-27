import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Input } from "./Form/Input";
import InputMask from "./Form/InputMask";
import { Select } from "./Form/Select";

type AddressProps = {
	title: string;
	cep: string;
	logradouro: string;
	numero: string;
	complemento: string;
	bairro: string;
	cidade: string;
	uf?: string;
	tipoLogradouro: string;
	pais?: string;
	isSubmit: boolean;
	setIsSubmit: (value: boolean) => void;
};

export function Address({
	title,
	cep,
	logradouro,
	numero,
	complemento,
	bairro,
	cidade,
	uf,
	tipoLogradouro,
	pais,
	isSubmit,
	setIsSubmit,
}: AddressProps) {
	const [cepValue, setCepValue] = useState("");
	const [logradouroValue, setLogradouroValue] = useState("");
	const [bairroValue, setBairroValue] = useState("");
	const [cidadeValue, setCidadeValue] = useState("");
	const [ufValue, setUfValue] = useState("");

	const numeroRef = useRef<HTMLInputElement>(null);
	const complementoRef = useRef<HTMLInputElement>(null);
	const paisRef = useRef<HTMLInputElement>(null);
	const tipoLogradouroRef = useRef<HTMLSelectElement>(null);

	const tipoLogradouroOptions = [
		{ value: "", label: "SELECIONE", selected: true },
		{ value: "ACAMPAMENTO", label: "ACAMPAMENTO" },
		{ value: "ACESSO", label: "ACESSO" },
		{ value: "ALAMEDA", label: "ALAMEDA" },
		{ value: "ÁREA", label: "ÁREA" },
		{ value: "AVENIDA", label: "AVENIDA" },
		{ value: "BALNEÁRIO", label: "BALNEÁRIO" },
		{ value: "BECO", label: "BECO" },
		{ value: "BLOCO", label: "BLOCO" },
		{ value: "BOSQUE", label: "BOSQUE" },
		{ value: "CHÁCARA", label: "CHÁCARA" },
		{ value: "COLÔNIA", label: "COLÔNIA" },
		{ value: "CONDOMÍNIO", label: "CONDOMÍNIO" },
		{ value: "CONJUNTO", label: "CONJUNTO" },
		{ value: "CONJUNTO HABITACIONAL", label: "CONJUNTO HABITACIONAL" },
		{ value: "DISTRITO", label: "DISTRITO" },
		{ value: "ESTRADA", label: "ESTRADA" },
		{ value: "ESTRADA PARTICULAR", label: "ESTRADA PARTICULAR" },
		{ value: "FAZENDA", label: "FAZENDA" },
		{ value: "FAZENDINHA", label: "FAZENDINHA" },
		{ value: "FEIRA", label: "FEIRA" },
		{ value: "GALERIA", label: "GALERIA" },
		{ value: "GRANJA", label: "GRANJA" },
		{ value: "JARDIM", label: "JARDIM" },
		{ value: "LADEIRA", label: "LADEIRA" },
		{ value: "LAGO", label: "LAGO" },
		{ value: "LAGOA", label: "LAGOA" },
		{ value: "LARGO", label: "LARGO" },
		{ value: "LOTEAMENTO", label: "LOTEAMENTO" },
		{ value: "MORRO", label: "MORRO" },
		{ value: "NÚCLEO", label: "NÚCLEO" },
		{ value: "PARALELA", label: "PARALELA" },
		{ value: "PARQUE", label: "PARQUE" },
		{ value: "PASSARELA", label: "PASSARELA" },
		{ value: "PATIO", label: "PATIO" },
		{ value: "PRAÇA", label: "PRAÇA" },
		{ value: "PRAIA", label: "PRAIA" },
		{ value: "QUADRA", label: "QUADRA" },
		{ value: "QUILÔMETRO", label: "QUILÔMETRO" },
		{ value: "RECANTO", label: "RECANTO" },
		{ value: "RESIDENCIAL", label: "RESIDENCIAL" },
		{ value: "RODOVIA", label: "RODOVIA" },
		{ value: "RUA", label: "RUA" },
		{ value: "RUA DE PEDESTRE", label: "RUA DE PEDESTRE" },
		{ value: "RUA PARTICULAR", label: "RUA PARTICULAR" },
		{ value: "RUA PROJETADA", label: "RUA PROJETADA" },
		{ value: "SETOR", label: "SETOR" },
		{ value: "SÍTIO", label: "SÍTIO" },
		{ value: "TRAVESSA", label: "TRAVESSA" },
		{ value: "TRECHO", label: "TRECHO" },
		{ value: "VALE", label: "VALE" },
		{ value: "VEREDA", label: "VEREDA" },
		{ value: "VIA", label: "VIA" },
		{ value: "VIA DE PEDESTRE", label: "VIA DE PEDESTRE" },
	];

	useEffect(() => {
		if (isSubmit) {
			setCepValue("");
			setLogradouroValue("");
			setBairroValue("");
			setCidadeValue("");
			setUfValue("");
			if (paisRef.current) paisRef.current.value = "";
			if (tipoLogradouroRef.current) tipoLogradouroRef.current.value = "";
			numeroRef.current.value = "";
			complementoRef.current.value = "";
			setIsSubmit(false);
		}
	}, [isSubmit, setIsSubmit]);

	const checkCep = async (cep: string) => {
		const cepClean = cep.replace(/\D/g, "");
		axios
			.get(`https://viacep.com.br/ws/${cepClean}/json/`)
			.then((response) => {
				if (cepClean.length !== 8) {
					setLogradouroValue("CEP não encontrado ou incorreto");
					setBairroValue("");
					setCidadeValue("");
					setUfValue("");
				} else {
					setLogradouroValue(response.data.logradouro);
					setBairroValue(response.data.bairro);
					setCidadeValue(response.data.localidade);
					setUfValue(response.data.uf);
				}
			})
			.catch((error) => {
				setLogradouroValue("CEP inválido");
				setBairroValue("");
				setCidadeValue("");
				setUfValue("");
			});
	};

	return (
		<fieldset className="border p-4 rounded w-full my-2">
			<legend className="text-lg font-medium leading-6 text-white dark:text-white">
				{title}
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 md:gap-2 mb-2">
				<InputMask
					name={cep}
					value={cepValue}
					onChange={(e) => setCepValue(e.target.value)}
					label="CEP"
					onBlur={(e) => checkCep(e.target.value)}
					className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
					mask="99999-999"
				/>
				<Select
					name={tipoLogradouro}
					localRef={tipoLogradouroRef}
					label="Tipo de Logradouro"
				>
					{tipoLogradouroOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Select>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-2 mb-2">
				<Input
					name={logradouro}
					value={logradouroValue}
					label="Endereço"
					className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
				/>
				<Input
					name={numero}
					localRef={numeroRef}
					label="N°"
					className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
				/>
				<Input
					name={complemento}
					localRef={complementoRef}
					label="Complemento"
					className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-2 mb-2">
				<Input
					name={bairro}
					value={bairroValue}
					onChange={(e) => setBairroValue(e.target.value)}
					label="Bairro"
					className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
				/>
				<Input
					name={cidade}
					value={cidadeValue}
					label="Município"
					className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
				/>
				{uf && (
					<Input
						name={uf}
						value={ufValue}
						label="UF"
						className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
					/>
				)}
				{pais && (
					<Input
						name={pais}
						localRef={paisRef}
						label="País"
						className="px-3 py-2 border outline-none rounded-lg w-full border-blue-400"
					/>
				)}
			</div>
		</fieldset>
	);
}
