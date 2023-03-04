import { NewWorkflowEditData } from "@/services/MethodSe/WorkFlow/NewWorkflowEditData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function DataSetPage(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { processid, wftitle, entityid, attributelist, filelist } = req.body;
	const { method } = req;

	if (method === "POST") {
		try {
			const response = await NewWorkflowEditData({
				processid,
				wftitle,
				entityid,
				attributelist,
				filelist,
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
