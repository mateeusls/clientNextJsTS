import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Verify(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;
	const { token } = req.body;

	if (method === "POST") {
		try {
			const decoded = jwt.verify(token, "d41d8cd98f00b204e9800998ecf8427e&");

			if (decoded) {
				const user = await prisma.user.findFirst({
					where: {
						id: decoded.id,
					},
				});
				delete user.password;
				return res.json(user);
			}
		} catch (error) {
			return res.status(401).json({ status: 401, message: "Token Inválido" });
		}
	}
}
