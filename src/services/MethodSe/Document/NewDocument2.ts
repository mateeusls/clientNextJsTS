import { ClientSoap } from "@/services/ClientSe";

interface NewDocument2Props {
	categoryId: string;
	documentId?: string;
	title: string;
	files: Array<object> | "";
}

export async function NewDocument2({
	categoryId,
	documentId,
	title,
	files,
}: NewDocument2Props) {
	const client = await ClientSoap("dc_ws");

	try {
		const args = {
			CategoryID: categoryId,
			DocumentID: documentId,
			Title: title,
			FilesList: [
				{
					File: files,
				},
			],
		};
		const results = await client.newDocument2Async(args);
		return results[0];
	} catch (error) {
		return error;
	}
}
