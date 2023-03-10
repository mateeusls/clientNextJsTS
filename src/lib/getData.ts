import { api } from "@/services/api";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export async function getCard(rnp: string) {
	const { data } = await api.post("/confea/Carteiras/Listar", { rnp });

	const titulos = [data.crtTit1, data.crtTit2, data.crtTit3, data.crtTit4];

	return {
		titulos,
		tipoCarteira: data.tpoCarteira,
		dataEmissao: format(new Date(data.dtaEms), "dd/MM/yyyy", { locale: ptBR }),
		nroReg: data.crtNroRegCrtM,
	};
}

export async function getProfissional(rnp: string) {
	const { data } = await api.post("/confea/Profissionais/Listar", { rnp });

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
	const { data } = await api.post("/confea/Imagens/Listar", { rnp });

	return {
		foto: data.foto,
		assinatura: data.assinatura,
	};
}
