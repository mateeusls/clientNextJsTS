import { ExecuteActivity } from "@/services/MethodSe/WorkFlow/ExecuteActivity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ExecuteActivityPage(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { wfid, activityid, ActionSequence } = req.body;
	const { method } = req;

	if (method === "POST") {
		try {
			const response = await ExecuteActivity({
				wfid,
				activityid,
				ActionSequence,
			});
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
