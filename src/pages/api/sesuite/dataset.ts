import { NextApiRequest, NextApiResponse } from "next";
import { DataSet } from "../../../services/MethodSe/Form/DataSet";

export default async function DataSetPage(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { dataset, params } = req.body;
	const { method } = req;

	if (method === "POST") {
		try {
			const response = await DataSet({ dataset, params });
			const data = await response;
			return res.json(data);
		} catch (error) {
			return res.json(error);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
