// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	login?: string;
	password?: string;
	message?: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method } = req;
	const { login, password } = req.body;

	if (method === "POST") {
		res.status(200).json({ login, password });
	} else {
		res.status(400).json({ message: "Not Found" });
	}
}
