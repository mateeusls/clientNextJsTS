import { ClientSoap } from "@/services/ClientSe";

interface NewDocument2Props {
	categoryId: string;
	documentId?: string;
	title: string;
	files:
		| {
				Name: string;
				Content: string;
				Container?: string;
		  }[]
		| [];
}

export async function NewDocument2({
	categoryId,
	documentId,
	title,
	files,
}: NewDocument2Props) {
	const client = await ClientSoap("dc_ws");

	console.log(files, documentId, title, categoryId);

	try {
		const args = {
			CategoryID: categoryId,
			DocumentID: documentId,
			Title: title,
			FilesList: files,
		};
		const results = await client.newDocument2Async(args);
		return results[0];
	} catch (error) {
		return error;
	}
}
