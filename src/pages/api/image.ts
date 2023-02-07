// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { api } from "@/services/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	foto: string;
	assinatura: string;
};

type AxiosResponse = {
	image: Data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method } = req;

	if (method === "POST") {
		const { rnp } = req.body;
		const { data } = await api.post<AxiosResponse | any>("api/Imagens/Listar", {
			rnp,
		});

		res.status(200).json({
			foto: data?.foto,
			assinatura: data?.assinatura,
		});
	} else {
		res.status(400).json({ foto: "", assinatura: "" });
	}
}
