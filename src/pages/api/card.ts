// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { api } from "@/services/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	titulo1: string;
	titulo2: string;
	titulo3: string;
	titulo4: string;
	tipoCarteira: string;
};

type AxiosResponse = {
	data: Data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method } = req;

	if (method === "POST") {
		const { rnp } = req.body;
		const { data } = await api.post<AxiosResponse | any>(
			"api/Carteiras/Listar",
			{
				rnp,
			}
		);

		res.status(200).json({
			tipoCarteira: data?.tpoCarteira,
			titulo1: data?.crtTit1,
			titulo2: data?.crtTit2,
			titulo3: data?.crtTit3,
			titulo4: data?.crtTit4,
		});
	} else {
		res.status(400).json({
			titulo1: "",
			titulo2: "",
			titulo3: "",
			titulo4: "",
			tipoCarteira: "",
		});
	}
}
