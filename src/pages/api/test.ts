import { NextApiRequest, NextApiResponse } from "next";

export default async function Test(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	if (method === "POST") {
		res.status(200).json({ login: req.body.login });
	}
}
