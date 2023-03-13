import { DataSet } from "@/services/MethodSe/Form/DataSet";
import { add } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

interface IDataSet {
	oidabccg2jp0fwadwa: string;
	idprocesso: string;
	oidabci8bxian2qggr: string;
	papelfuncpai: string;
	bnupdated: number;
	oidanxdiplomactf: string;
	ativhabilitada: string;
	oidabclqnw5meoqo3y: string;
	nomemae: string;
	oidrevisionform: string;
	idpfcamara: string;
	nispispasep: string;
	matuserespecifi: string;
	logradouroresid: string;
	complresidencia: string;
	telresidencial: string;
	outrasnecessid: string;
	auxfatorrh: string;
	numresidencial: string;
	pntrefcomercial: string;
	nmuserupdate: string;
	oidabcb8yi64g5xb1a: string;
	numerornp: string;
	oidanxassinatura: string;
	nrversion: number;
	numcomercial: string;
	cepresidencial: string;
	ufcomercial: string;
	bairrocomercial: string;
	oidanxcompendereco: string;
	nmpfcamara: string;
	oidabcymrauq4mr88q: string;
	cbregistromae: number;
	fgsystem: number;
	oidabcrj9ify4mtbv0: string;
	zonaeleitoral: string;
	auxufexpedidor: string;
	auxtiposanguine: string;
	oidanxtituloeleito: string;
	cbsolregcrea: number;
	datanascimento: string;
	numtituloeleito: string;
	auxlograscomerc: string;
	complcomercial: string;
	oidabca0q0u0gu506f: string;
	nomepai: string;
	oidabcfy70ftptralm: string;
	bncreated: number;
	email: string;
	auxestadcivil: string;
	oidabcnvk18sqy2moz: string;
	oidfotoprofissiona: string;
	cbinfoverdade: number;
	auxtpregistro: string;
	auxufnaturalid: string;
	nomepapelfunc: string;
	outroscontatos: string;
	auxnecesespecia: string;
	cpfprofissional: string;
	idpapelfunc: string;
	auxcpf: string;
	oidanxnispispasep: string;
	craresultanalis: string;
	oidabckgh6o50e9gsl: string;
	auxdiplomado: string;
	orgaoexpoutros: string;
	oidanxservmilitar: string;
	loginapp: string;
	auxcidnaturalid: string;
	fgenabled: number;
	cepcomercial: string;
	nomeprofissiona: string;
	ufresidencial: string;
	auxgenero: string;
	dataexpedicao: string;
	secaoeleitoral: string;
	oidanxtiposangue: string;
	auxorgexpedidor: string;
	oidabcfspjrsenm5u7: string;
	datasolicitacao: string;
	oidabc7sugs5e8se0k: string;
	nomesocial: string;
	auxlogradreside: string;
	oidabcbb57k48suw1h: string;
	cbmsmendereco: number;
	oid: string;
	oidanxidentidade: string;
	oidabcun5uakvlx108: string;
	bairroresidenc: string;
	cidadecomercial: string;
	oidanxcargahoraria: string;
	celular: string;
	oidanxcpf: string;
	telcomercial: string;
	auxmunicieleito: string;
	pntrefresidenc: string;
	identidadeprof: string;
	logradourocomer: string;
	oidanxjusticaeleit: string;
	rbdiplomacia: number;
	cidaderesidenc: string;
	auxdoadororgao: string;
	orgaoexpufexp: string;
	auxufeleitoral: string;
	pfpaicamara: string;
	cbregistropai: number;
	nmuserespecific: string;
	homepage: string;
}

function getInitials(sentence: string) {
	const words = sentence.split(" ");
	const initials = words.map((word) => word.charAt(0).toUpperCase());
	return initials.join("");
}

export default async function ProfissionalPage(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { idprocess } = req.query;
	const { method } = req;

	if (method === "POST") {
		const response = await DataSet({
			dataset: "TESTEREGP",
			params: { IDPROCESSO: idprocess },
		});

		if (response.length === 0) {
			return res.status(404).json({ message: "Registro não encontrado" });
		}

		let tipoRnp = null;
		let tipoReg = null;
		if (
			response[0].auxtpregistro.includes(
				"Registro Definitivo de Profissional"
			) &&
			response[0].auxdiplomado === "BRASIL"
		) {
			tipoRnp = 1;
			tipoReg = "PP";
		} else if (
			response[0].auxtpregistro === "Registro Provisório de Profissional"
		) {
			tipoRnp = 2;
			tipoReg = "PP";
		} else if (
			response[0].auxtpregistro === "Registro Definitivo de Profissional" &&
			response[0].auxdiplomado === "EXTERIOR"
		) {
			tipoRnp = 3;
			tipoReg = "PDE";
		}
		const insertProfissional = {
			sisIdtPrfNroCpf: response[0].cpfprofissional.replace(/\D/g, ""),
			tpoRnp: tipoRnp,
			dtaGerRnp: new Date().toISOString(),
			dtaValRnp:
				tipoRnp === 1 ? add(new Date(), { years: 1 }).toISOString() : "",
			tpoReg: tipoReg,
			nme: response[0].nomeprofissiona.toUpperCase(),
			nmeMae: response[0].nomemae.toUpperCase(),
			nmePai: response[0].nomepai.toUpperCase(),
			dtaNsc: response[0].datanascimento,
			tpoSex: response[0].auxgenero,
			estCiv: response[0].auxestadcivil,
			dscNac: response[0].auxgenero === "M" ? "BRASILEIRO" : "BRASILEIRA",
			dscNat: response[0].auxcidnaturalid.toUpperCase(),
			ufNat: response[0].auxufnaturalid.toUpperCase(),
			pisNac: response[0].auxnacionalidad.toUpperCase(),
			tpoSng: response[0].auxtiposanguine,
			tpoFrh: response[0].auxfatorrh,
			tpoNecEsp: response[0].auxnecesespecia,
			eml: response[0].email.toLowerCase(),
			tpoEndCor: response[0].auxlogradreside.substring(0, 1),
			nroIdt: response[0].identidadeprof.replace(/\D/g, ""),
			orgExpIdt: response[0].orgaoexpufexp,
			dtaExpIdt: response[0].dataexpedicao,
			nroTitEle: response[0].numtituloeleito,
			zonTitEle: response[0].zonaeleitoral,
			secTitEle: response[0].secaoeleitoral,
			dscMunTitEle: response[0].auxmunicieleito.toUpperCase(),
			ufTitEle: response[0].auxufeleitoral.toUpperCase(),
			creCadCod: "18",
			nroRegCre: null,
			creCadCodReg: "18",
			tpoNroImpCrt: "R",
			dtaRegCre: new Date().toISOString(),
			senAcs: null,
			dtaAlt: new Date().toISOString(),
			sisUsuLgn: "SIS_ACS_CREA-PE",
			indCorp: "S",
			indRec: "S",
			indBlqAlt: "N",
			nroPisPasep: response[0].nispispasep,
			flgDoador: response[0].auxdoadororgao === "Sim" ? true : false,
			nmeSocial: response[0].nomesocial,
			flgNmeSocial: response[0].nomesocial ? true : false,
			anuidades: [
				{
					anoPag: new Date().getFullYear(),

					tpoSit: "Q",

					creCadCod: "18",

					sisUsuLgn: "SIS_ACS_CREA-PE",

					qtdParcelas: 0,

					valor: 62.8,

					valorRecebido: 62.8,

					dtaPag: "2023-01-04",

					nroBoleto: "30302510001652140",
				},
			],
			titulos: [
				{
					prfCadCodRnp: "string",
					titCadCod: 0,
					titImpCrt: "s",
					insEnsCadCod: 0,
					curCadCod: 0,
					insEnsCadNme: "string",
					curCadNme: "string",
					dtaCol: "string",
					tpoCpr: "s",
					nroRegDip: "string",
					creCadCod: "st",
					sisUsuLgn: "string",
					tpoTitPrincipal: "s",
					tpoCarteira: "s",
					dtaExp: "2019-08-24T14:15:22Z",
					dscApo: "string",
					dscAtr: "string",
					dscRst: "string",
					obs: "string",
				},
			],
			enderecos: [
				{
					tpoEnd: response[0].auxlogradreside.substring(0, 1),
					tpoLog: response[0].auxlogradreside,
					dscLog: response[0].logradouroresid,
					comLog: response[0].complresidencia,
					nroLog: response[0].numresidencial,
					baiLog: response[0].bairroresidenc,
					locLog: response[0].cidaderesidenc,
					ufLog: response[0].ufresidencial,
					cepLog: response[0].cepresidencial.replace(/\D/g, ""),
					ddd: response[0].celular.replace(/\D/g, "").substring(0, 2),
					tel: response[0].celular.replace(/\D/g, "").substring(2, 11),
					ddd2: response[0].telresidencial.replace(/\D/g, "").substring(0, 2),
					tel2: response[0].telresidencial.replace(/\D/g, "").substring(2, 11),
					sisUsuLgn: "SIS_ACS_CREA-PE",
				},
			],
		};

		res.json(insertProfissional);
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
