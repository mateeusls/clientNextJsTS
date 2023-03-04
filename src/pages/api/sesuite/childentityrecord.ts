import { NewChildEntityRecord } from "@/services/MethodSe/WorkFlow/NewChildentityRecord";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ChildEntityRecordPage(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;
	const { wfid, mainentityid, childrelationshipid, attributelist } = req.body;

	if (method === "POST") {
		try {
			const response = await NewChildEntityRecord({
				wfid,
				mainentityid,
				childrelationshipid,
				attributelist,
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
