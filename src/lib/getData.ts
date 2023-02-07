import axios from "axios";
import { format } from "date-fns";

export async function getCard(rnp: string) {
	const { data } = await axios({
		method: "post",
		url: "http://187.87.138.222:3333/api/Carteiras/Listar",
		data: { rnp },
	});

	const titulos = [data.crtTit1, data.crtTit2, data.crtTit3, data.crtTit4];

	return {
		titulos,
		tipoCarteira: data.tpoCarteira,
		dataEmissao: format(new Date(data.dtaEms), "dd/MM/yyyy"),
		nroReg: data.crtNroRegCrtM,
	};
}

export async function getProfissional(rnp: string) {
	const { data } = await axios({
		method: "post",
		url: "http://187.87.138.222:3333/api/Profissionais/Listar",
		data: { rnp },
	});

	return {
		nameMae: data?.nmeMae,
		namePai: data?.nmePai,
		rg: data?.nroIdt,
		dateRegister: format(new Date(data?.dtaGerRnp), "dd/MM/yyyy"),
		dateBirth: format(new Date(data?.dtaNsc), "dd/MM/yyyy"),
		naturalidade: data?.dscNat,
		nacionalidade: data?.dscNac,
		tipoSanguineo: data?.tpoSng,
		tituloEleitor: data?.nroTitEle,
		pispasep: data?.nroPisPasep,
	};
}

export async function getImage(rnp: string) {
	const { data } = await axios({
		method: "post",
		url: "http://187.87.138.222:3333/api/Imagens/Listar",
		data: { rnp },
	});

	return {
		foto: data.foto,
		assinatura: data.assinatura,
	};
}
