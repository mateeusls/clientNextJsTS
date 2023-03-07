import { NewDocument2 } from "@/services/MethodSe/Document/NewDocument2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function NewDocument2Page(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { categoryId, documentId, title, files } = req.body;
	const { method } = req;

	if (method === "POST") {
		try {
			const response = await NewDocument2({
				categoryId,
				documentId,
				title,
				files: files || [],
			});

			return res.json(response);
		} catch (error) {
			return res.json(error);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
