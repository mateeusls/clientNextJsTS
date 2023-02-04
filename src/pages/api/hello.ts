// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name?: string;
	first?: string;
	last?: string;
	message?: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method } = req;
	const { first, last } = req.body;

	if (method === "POST") {
		res.status(200).json({ name: "John Doe", first, last });
	} else {
		res.status(400).json({ message: "Not Found" });
	}
}
