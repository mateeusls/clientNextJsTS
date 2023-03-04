import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface User {
	id: number;
	name: string;
	cpf: string;
	password?: string;
	rnp: string;
	email: string;
}

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	const { login, password } = req.body;

	if (method === "POST") {
		const user: User = await prisma.user.findUnique({
			where: {
				cpf: login,
			},
		});

		if (user) {
			const validPassword = await bcrypt.compare(password, user.password);

			delete user.password;

			const id = user.id;
			if (validPassword) {
				const token = jwt.sign({ id }, "d41d8cd98f00b204e9800998ecf8427e&", {
					expiresIn: "1h",
				});

				const userData = {
					...user,
				};

				res.json({ user, token });
			} else {
				res.status(401).json({ status: 401, message: "Senha Inválida" });
			}
		} else {
			res.status(401).json({ status: 401, message: "Usuário Inválido" });
		}
	}
}
