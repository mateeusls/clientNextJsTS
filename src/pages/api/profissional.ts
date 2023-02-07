// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { api } from "@/services/api";
import { format } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	nameMae?: string;
	namePai?: string;
	rg?: string;
	dateRegister?: string;
	dateBirth?: string;
	naturalidade?: string;
	nacionalidade?: string;
	tipoSanguineo?: string;
	tituloEleitor?: string;
	pispasep?: string;
};

type AxiosResponse = {
	user: Data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method } = req;

	if (method === "POST") {
		const { rnp } = req.body;
		const { data } = await api.post<AxiosResponse | any>(
			"api/Profissionais/Listar",
			{ rnp }
		);

		res.status(200).json({
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
		});
	} else {
		res.status(400).json({});
	}
}
